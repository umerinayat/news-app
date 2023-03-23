import React, { useState , useEffect } from 'react';
import Error from '../../components/Ui/Error/Error';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import noImage from '../../assets/images/no-image.jpg';
import SourcesService from '../../api-services/sourcesService';
import { useDispatch, useSelector } from 'react-redux';
import sourcesSlice from '../../store/sourcesSlice';
import NewsService from '../../api-services/newsService';


const News = () => {
  const { sourcesMeta } = useSelector((state) => state.sources);

  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  const [sources, setSources] = useState([]);
  const [source, setSource] = useState('');
  const [selectedSources, setSelectedSources] = useState({});
  const [newsPrefValue, setNewsPrefValue] = useState('category');

  const [savedCategory, setSavedCategory] = useState(null);
  const [savedSources,  setSavedSources]  =  useState(null);

  const [totalResults, setTotalResults] = useState(0);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCategoryChange = (event) => {
    const cat = event.target.value;
    setCategory(cat);
    setSource('');
    getSources(cat);
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
    setSelectedSources({
      ...selectedSources,
      [event.target.value]:
        event.target.options[event.target.selectedIndex].text,
    });

    let filterSources = sources.filter((s) => {
      if (event.target.value == s.id) {
        // skip
      } else {
        return s;
      }
    });

    setSources(filterSources);
    setSource('');
  };

  const getSources = async (category) => {
    try {
      // get sources
      const { sources } = await SourcesService.getSources({
        category,
      });

      let filterSources = sources.sources.filter((s) => {
        if (s.id in selectedSources) {
          // skip already selected
        } else {
          return s;
        }
      });

      setSources(filterSources);
    } catch (error) {}
  };

  // get news
  const fetchNews = async (payload) => {
    setTotalResults(0);
    setNews([]);
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { news } = await NewsService.getNews(payload);
      setTotalResults(news.totalResults);
      setNews(news.articles);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage('Problem in getting news please try later');
      }
      setTotalResults(0);
      setNews([]);
      setIsLoading(false);
    }
  };

  const saveAndgetNews = async () => {
    setErrorMessage('');
    switch (newsPrefValue) {
      case 'category':
        if (category == '') {
          setErrorMessage('Please first select a Category');
          return;
        }
        fetchNews({ category });
        await NewsService.saveNewsSettings({
          category,
          sources: null
        });
        setSelectedSources({});
        break;
      case 'sources':
        if (Object.keys(selectedSources).length == 0) {
          setErrorMessage(
            'Please first select a Category and add sources based on that Category'
          );
          return;
        }
        let soursesKeys = Object.keys(selectedSources).map((key) => key);
        let joinSources = soursesKeys.join(',');
        fetchNews({ sources: joinSources });
        await NewsService.saveNewsSettings({
          category: null,
          sources: joinSources
        });
        break;
    }

    
  };


  useEffect(() => {
    (async () => {
      try {
        const { newsSettings } = await NewsService.getNewsSettings();
        setSavedCategory(newsSettings.category);
        setSavedSources(newsSettings.sources);
        if(newsSettings.category !== null) {
          setNewsPrefValue('category');
          setCategory(newsSettings.category);
          await getSources(newsSettings.category);
          await fetchNews({category: newsSettings.category});
        } else {
          setNewsPrefValue('sources');
          let sSources = {} ;
          (newsSettings.sources.split(',')).map(s => {
            sSources = {...sSources, [s]:s}
          });
          
          setSelectedSources(sSources);
          await fetchNews({sources: newsSettings.sources});
        }
      } catch (error) {}
    })()
  }, []);

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

  const displayNews = () => {
    return news.map((n, i) => (
      <div class="card mb-3 position-relative" key={`news-${i}`}>
        <span class="source">Source: {n.source.name} </span>
        <span class="date">
          Date: {moment(n.publishedAt).format('YYYY-MM-DD')}{' '}
        </span>
        <img
          src={n.urlToImage || noImage}
          className="card-img-top"
          alt={n.title}
        />
        <div class="card-body">
          <h3 class="card-title font-gh" dangerouslySetInnerHTML={{ __html: n.title }}></h3>

          <p class="card-text" dangerouslySetInnerHTML={{ __html: n.description }}></p>

          <p
            class="card-text"
            dangerouslySetInnerHTML={{ __html: n.content }}
          />

          <a href={n.url} target="_blank" class="btn btn-dark">
            View
          </a>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="display-3 font-gh">News</div>
          <div className="mb-1 lead"> Your personlized News Feed </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-2 font-gh">Choose Category</div>
        <div className="col-sm-2 font-gh">Add Sources</div>
      </div>

      <div className="row">
        <div className="col-sm-2">
          <select
            value={category}
            name="category"
            onChange={handleCategoryChange}
            class="form-select"
          >
            <option value="" disabled selected>
              Choose Category
            </option>
            {sourcesMeta.categories.map((cat, i) => (
              <option value={cat} key={`cat-${i}`}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-2">
          <select
            class="form-select"
            value={source}
            onChange={handleSourceChange}
          >
            <option value="" disabled selected>
              Choose Source
            </option>
            {sources.map((source, i) => (
              <option value={source.id} key={`src-${i}`}>{source.id}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-2">
          <button className="btn btn-dark" onClick={saveAndgetNews}>
            Save
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-8 ps-3 pt-2">
          {Object.keys(selectedSources).map((sourceId, i) => (
            <span className="badge bg-danger p-2 me-1 mt-2" key={`sid-${i}`}>
              {' '}
              {selectedSources[sourceId]}{' '}
            </span>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <Error errors={[errorMessage]} />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-12">
          <div class="text-success">
            Note: Personlized News Feed are bound to Category or Multiple
            sources.
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-4">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="news-pref"
              id="category"
              onChange={(event) => setNewsPrefValue('category')}
              checked={newsPrefValue === 'category'}
            />
            <label class="form-check-label" htmlFor="category">
              Category
            </label>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="news-pref"
              id="source"
              onChange={(event) => setNewsPrefValue('sources')}
              checked={newsPrefValue === 'sources'}
            />
            <label class="form-check-label" for="source">
              Sources
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12">
          <div className="h6 font-gh text-sm ps-0">
            Total News Count <span> ({totalResults}) </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="d-flex flex-wrap gap-5 justify-content-center">
            {isLoading && displaySkeleton()}
            {displayNews()}
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
