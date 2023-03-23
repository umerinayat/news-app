import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../api-services/authService';
import { useStateContext } from '../../contexts/ContextProvider';
import Error from '../../components/Ui/Error/Error';

const Login = () => {

  const {setUser, setToken} = useStateContext();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const submitLoginForm = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const {user, token} = await AuthService.login(loginForm);
      setUser(user);
      setToken(token);
      setIsLoading(false);
    } catch(error) {
      const response = error.response;
      if(response && response.status === 422) {
        setErrorMessage('Invalid Email or Password');
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="display-5 text-center font-gh">Welcome Back</div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12">
          <form className="w-50 m-auto" onSubmit={submitLoginForm}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                className="form-control custom-form-control"
                name="email"
                id="email"
                onChange={handleLoginFormChange}
                required
              />
            
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password *
              </label>
              <input
                type="password"
                className="form-control custom-form-control"
                name="password"
                id="password"
                onChange={handleLoginFormChange}
                required
              />
            </div>
    
            {errorMessage && (<Error errors={[errorMessage]} />)}

            <div className="d-grid mt-2">
            <button type="submit" className="btn btn-dark" disabled={isLoading}>
              
              Login 
              {isLoading && (<span class="spinner-border spinner-border-sm text-light ms-2"></span>)}
            </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className='text-center'>Don't have an account? <Link className="font-gh" to="/register">Register</Link></div>
        </div>
      </div>
    </>
  );
};

export default Login;
