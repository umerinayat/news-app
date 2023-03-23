<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Articles\ArticlesRequest;
use App\Modules\News\ApiDataSource\NewsApi;
use Exception;
use Illuminate\Http\Request;

class ArticlesAggregatorController extends Controller
{   
    // constructor 
    public function __construct()
    {
        NewsApi::init();
    }

    // search and filter articles
    public function searchAndFilterArticles(ArticlesRequest $request)
    {   
        $keyword  = $request->input('keyword');
        $date     = $request->input('date'     , null);
        $source   = $request->input('source'   , null);

        $articles = [];

        try 
        {
            if(is_null($date) && is_null($source))
            {
                $articles = NewsApi::getAllArticles(
                    $request->keyword
                );
            } 
            else
            {
                
                $articles = NewsApi::getAllArticles(
                    $keyword,
                    $source,
                    $date
                );
            }
        } catch (Exception $error)
        {
            return response()->json([
                'articles' => $articles
            ], 422);

        }

        return response()->json([
            'articles' => $articles
        ]);
    }
}
