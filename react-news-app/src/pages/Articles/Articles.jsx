import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import Error from '../../components/Ui/Error/Error';
import ArticlesService from '../../api-services/articlesService';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import noImage from '../../assets/images/no-image.jpg';
import SourcesService from '../../api-services/sourcesService';
import { useDispatch, useSelector } from 'react-redux';
import sourcesSlice from '../../store/sourcesSlice';

const Articles = () => {
  const { user } = useStateContext();
  const {sourcesMeta, sources} = useSelector(
    (state) => state.sources
  );

  const dispatch = useDispatch();
  
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    category: null,
    source: null,
    date: null,
  });
  
  const [totalResults, setTotalResults] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');

  const handleCategoryChange = (event) => {
    const cat = event.target.value;
    setCategory(cat);
    setSearchParams({...searchParams, category: cat});
    setSource('');
    getSources(cat);
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
    setSearchParams({...searchParams, source: event.target.value});
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setSearchParams({...searchParams, date: event.target.value});
  }

  const getSources = async (category) => {
    try {
      // get sources
      const { sources } = await SourcesService.getSources({
        category,
      });
      dispatch(sourcesSlice.actions.setSources(sources.sources));
    } catch (error) {}
  };

  const handleKeywordChange = async (event) => {
    const value = event.target.value;
    setSearchParams({ ...searchParams, keyword: value });
  };

  const handleFetchArticles = (event) => {
    if (event.key === 'Enter') {
      fetchArticles(searchParams);
    }
  };

  // get articles
  const fetchArticles = async (payload) => {
    if(searchParams.keyword.length === 0) {
      return;
    }
    setTotalResults(0);
    setArticles([]);
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { articles } = await ArticlesService.getArticles(payload);
      setTotalResults(articles.totalResults);
      setArticles(articles.articles);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage('Problem in getting articles please try later');
      }
      setTotalResults(0);
      setArticles([]);
      setIsLoading(false);
    }
  };

  const displayArticles = () => {
    return articles.map((article, i) => (
      <div class="card mb-3 position-relative" key={`article-${i}`}>
        <span class="source">Source: {article.source.name} </span>
        <span class="date">
          Date: {moment(article.publishedAt).format('YYYY-MM-DD')}{' '}
        </span>
        <img
          src={article.urlToImage || noImage}
          className="card-img-top"
          alt={article.title}
        />
        <div class="card-body">
          <h3 class="card-title font-gh">{article.title}</h3>

          <p class="card-text">{article.description}</p>

          <p
            class="card-text"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <a href={article.url} target="_blank" class="btn btn-dark">
            View
          </a>
        </div>
      </div>
    ));
  };

  const displaySkeleton = () => {
    return (
      <>
        <div class="card mb-3 w-50">
          <Skeleton height={300} />
          <div class="card-body">
            <Skeleton count={6} />
          </div>
        </div>
        <div class="card mb-3 w-50">
          <Skeleton height={300} />
          <div class="card-body">
            <Skeleton count={6} />
          </div>
        </div>
      </>
    );
  };

  const handleArticlesFilter = async () => {
    fetchArticles(searchParams);
  };

  const handleClearFilters = async () => {
    setDate('');
    setCategory('');
    setSource('');
    setSearchParams({...searchParams, category: null, date: null, source: null})
    fetchArticles({...searchParams, category: null, date: null, source: null});
  }


  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="display-3 font-gh">Search</div>
          <div className="mb-1 lead"> Millions of Articles & News sources </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <input
            onChange={handleKeywordChange}
            onKeyDown={handleFetchArticles}
            type="text"
            className="form-control custom-form-control"
            placeholder="Enter Keyword and press enter key"
          />
        </div>
        <Error errors={[errorMessage]} />
        <div className="row mb-1 ps-3">
          <div className="col-sm-2 font-gh">Date</div>
          <div className="col-sm-2 font-gh">Category</div>
          <div className="col-sm-2 font-gh">Source</div>
        </div>
        <div className="row">
          {/* Date */}
          <div className="col-sm-2">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          {/* Category */}
          <div className="col-sm-2">
            <select
              value={category}
              name="category"
              onChange={handleCategoryChange}
              class="form-select"
            >
              <option value='' disabled selected>Choose Category</option>
              {sourcesMeta.categories.map((cat, i) => (
                <option value={cat} key={`cc-${i}`}>{cat}</option>
              ))}
            </select>
          </div>
          {/* Source */}
          <div className="col-sm-2">
            <select
              class="form-select"
              value={source}
              onChange={handleSourceChange}
            >
              <option value='' disabled selected>Choose Source</option>
              {sources.map((source, i) => (
                <option value={source.id} key={`ss-${i}`}>{source.name}</option>
              ))}
            </select>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-dark me-3" onClick={handleArticlesFilter}>
              Filter
            </button>
            <button className="btn btn-warning" onClick={handleClearFilters}>
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12">
          <div className="h6 font-gh text-sm ps-0">
            Total Articles Count <span> ({totalResults}) </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="d-flex flex-wrap gap-5 justify-content-center">
            {isLoading && displaySkeleton()}
            {displayArticles()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
