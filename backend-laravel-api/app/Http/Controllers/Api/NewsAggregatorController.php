<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\News\NewsRequest;
use App\Models\NewsSetting;
use App\Modules\News\ApiDataSource\NewsApi;
use Illuminate\Http\Request;

class NewsAggregatorController extends Controller
{
    // constructor 
    public function __construct()
    {
        NewsApi::init();
    }

    // list personalized news feed
    public function personalizedNewsFeed(NewsRequest $request)
    {   
        $category = $request->input('category', null);
        $sources   = $request->input('sources', null);

        if (!is_null($category)) {
            $news = NewsApi::getNewsHeadlines(
                null,
                $category
            );
        } else if (!is_null($sources)) {
            $news = NewsApi::getNewsHeadlines(
                $sources,
                null
            );
        }


        return response()->json([
            'news' => $news
        ]);
    }

    // save personalized news feed settings
    public function saveNewsSettings(Request $request)
    {
        $newsSettings = NewsSetting::get();

        if(count($newsSettings) == 0) {
            NewsSetting::create($request->all());
        } else {
            $settings = $newsSettings->first();
            $settings->update($request->all());
        }

        return response()->json([
            'message' => 'News Settings Saved'
        ]);
    }

    public function getNewsSettings() 
    {
        $newsSettings = NewsSetting::get();

        if(count($newsSettings) == 0) {
            return response()->json([
                'newsSettings' => null
            ]);
        } else {
            return response()->json([
                'newsSettings' => $newsSettings->first()
            ]);
        }
    }
}
