<?php

namespace App\Modules\News\ApiDataSource;

use Exception;
use jcobhams\NewsApi\NewsApi as NewsApiClient;
use jcobhams\NewsApi\NewsApiException;

class NewsApi
{
    public static $client = null;

    // init client news api
    public static function init()
    {
        NewsApi::$client = new NewsApiClient(config('news.NEWS_API_KEY'));
    }

    // Get the list of allowed countries
    public static function getCountries()
    {
        try {
            $countries = NewsApi::$client->getCountries();
            return $countries;
        } catch (NewsApiException $error) {
            throw $error;
        }
    }

    // Get the list of allowed languages
    public static function getLanguages()
    {
        try {
            $languages = NewsApi::$client->getLanguages();
            return $languages;
        } catch (NewsApiException $error) {
            throw $error;
        }
    }

    // Get the list of allowed categories
    public static function getCategories()
    {
        try {
            $categories = NewsApi::$client->getCategories();
            return $categories;
        } catch (NewsApiException $error) {
            throw $error;
        }
    }

    // Get the list of sources
    public static function getSources($category, $language = null, $country = null)
    {
        try {
            $sources = NewsApi::$client->getSources($category, $language, $country);
            return $sources;
        } catch (NewsApiException $error) {
            throw $error;
        }
    }

    // Get the list of allowed sort by
    public static function getSortBy()
    {
        $sortBy = NewsApi::$client->getSortBy();
        return $sortBy;
    }

    // Get the list of articles 
    public static function getAllArticles($keyword, $sources = null, $from = null)
    {
        try {
            $all_articles = NewsApi::$client->getEverything($keyword, $sources, null, null, $from);
            return $all_articles;
        } catch (NewsApiException $error) {
            //  429 Too Many Requests in dev mode account limit
            throw $error;
        }
    }

    // get news headlines
    public static function getNewsHeadlines($sources, $category)
    {
        try {
            $news = NewsApi::$client->getTopHeadlines(null, $sources, null, $category);
            return $news;
        } catch (NewsApiException $error) {
            throw $error;
        }
    }
}
