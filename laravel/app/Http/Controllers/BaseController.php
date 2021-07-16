<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @param Any $result Data
     * @param string $message sending message
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];
        return response()->json($response, 200);
    }
    /**
     * success response method with pagination.
     * @param Any $result Data
     * @param int $page current page
     * @param int $pages page count
     * @param string $message sending message
     * @return \Illuminate\Http\Response
     */
    public function sendPaginatedResponse($result, $page, $pages, $message)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'page'    => $page,
            'pages'   => $pages,
            'message' => $message,
        ];
        return response()->json($response, 200);
    }
    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];
        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }
        return response()->json($response, $code);
    }
}
