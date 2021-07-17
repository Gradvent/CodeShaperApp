<?php

namespace App\Http\Controllers;

use App\Models\Pasta;
use App\Models\User;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PastaController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pastas = array_values(Pasta::lastPublic10()->all());
        // $pastas = Pasta::all();
        return $this->sendResponse($pastas, 'Pasta last retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required',
            'textcode' => 'required',
            'access' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation error", $validator->errors());
        }
        if (key_exists('exp', $input)) {
            $closedAt = Carbon::now();
            [$expNum, $expType] = explode(' ', $input['exp'], 2);
            $expNum = (int) $expNum;
            switch ($expType) {
                case 'm':
                    $closedAt = $closedAt->addMinutes($expNum);
                    break;
                case 'H':
                    $closedAt = $closedAt->addHours($expNum);
                    break;
                case 'D':
                    $closedAt = $closedAt->addDays($expNum);
                    break;
                case 'W':
                    $closedAt = $closedAt->addWeeks($expNum);
                    break;
                case 'M':
                    $closedAt = $closedAt->addMonths($expNum);
                    break;
            }
            $input[Pasta::C_CLOSED_AT] = $closedAt;
            unset($input['exp']);
        }
        $pasta = Pasta::create($input);
        return $this->sendResponse($pasta->toArray(), 'Pasta created');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (Auth::user())
            $q = Pasta::actives()->where('short',$id)->first();
        else
            $q = Pasta::actives()->whereIn('access', ['public', 'unlisted'])->where('short',$id)->first();
        if (!is_null($q)) 
            return $this->sendResponse($q, 'Success');
        return $this->sendError('Pasta not found');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pasta $pasta)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required',
            'textcode' => 'required',
            'access' => 'required',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        $pasta->update($input);
        $pasta->save();
        return $this->sendResponse($pasta, 'Pasta updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pasta $pasta)
    {
        $pasta->delete();
        return $this->sendResponse($pasta->toArray(), 'Pasta deleted successfully.');
    }
}
