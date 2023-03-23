<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sources\SourcesRequest;
use App\Modules\News\ApiDataSource\NewsApi;
use Exception;
use Illuminate\Http\Request;

class SourcesController extends Controller
{
    // constructor 
    public function __construct()
    {
        NewsApi::init();
    }
    
    // get sources
    public function getSources(SourcesRequest $request)
    {

        $category  = $request->input('category');
        $language  = $request->input('language' , null);
        $country   = $request->input('country'  , null);

        $sources = [];

        try {
            
            $sources = NewsApi::getSources($category, $language, $country);
           
        } catch (Exception $error) {
            return response()->json([
                'sources' => $sources
            ], 422);
        }

        return response()->json([
            'sources' => $sources
        ]);
    }

    // get sources categories, countries, languages
    public function getSourcesMeta()
    {
        $languages = [];
        $countries = [];
        $categories = [];

        try {
            $languages = NewsApi::getLanguages();
            $countries = NewsApi::getCountries();
            $categories = NewsApi::getCategories();
        } catch (Exception $error) {
            return response()->json([
                'languages'  =>  $languages,
                'countries'  =>  $countries,
                'categories' =>  $categories
            ], 422);
        }

        return response()->json([
            'languages' => $languages,
            'countries' => $countries,
            'categories' =>  $categories
        ]);
    }
}
