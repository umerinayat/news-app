import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useStateContext } from '../../../contexts/ContextProvider';
import Footer from './Footer';
import Header from './Header';
import { fetchSources } from '../../../store/sourcesSlice';

const AppLayout = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.sources);

  const navigate = useNavigate();

  const { user, token } = useStateContext();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      (async () => {
        dispatch(fetchSources());
      })();
    }
  }, []);

  return (
    <div className="container-fluid overflow-hidden p-0">
      <Header />
      <div className="row p-5">
        <div className="col-sm-12">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
