<?php

namespace App\Http\Controllers;

use App\Models\Pasta;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserPastaController extends BaseController
{
    const COUNT_IN_PAGE = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pastas = array_values(Pasta::lastMy10()->all());
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $page
     * @return \Illuminate\Http\Response
     */
    public function show($page)
    {
        $q = Pasta::myPasta();
        if (is_null($q)) 
            return $this->sendError('Pasta not found');
        $pages = intdiv($q->count(),static::COUNT_IN_PAGE)+1;
        $q = $q->sortByDesc(Pasta::CREATED_AT)
            ->slice(($page-1)*static::COUNT_IN_PAGE, static::COUNT_IN_PAGE);

        return $this->sendPaginatedResponse($q, $page, $pages, 'Success');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pasta $pasta)
    {
        //
    }
}
