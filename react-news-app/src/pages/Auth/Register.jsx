import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../api-services/authService';
import { useStateContext } from '../../contexts/ContextProvider';
import Error from '../../components/Ui/Error/Error';

const Register = () => {

  const {setUser, setToken} = useStateContext();

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegisterFormChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const submitRegisterForm = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const {user, token} = await AuthService.register(registerForm);
      setUser(user);
      setToken(token);
      setIsLoading(false);
    } catch(error) {
      const response = error.response;
      if(response && response.status === 422) {
        setErrors(response.data.errors);
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="display-5 text-center font-gh">Register</div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12">
          <form className="w-50 m-auto" onSubmit={submitRegisterForm}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Your Name *
              </label>
              <input
                type="text"
                className="form-control custom-form-control"
                name="name"
                id="name"
                onChange={handleRegisterFormChange}
                required
              />
              {'name' in errors ? (<Error errors={errors['name']} />) : ('') }
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                className="form-control custom-form-control"
                name="email"
                id="email"
                onChange={handleRegisterFormChange}
                required
              />
               {'email' in errors ? (<Error errors={errors['email']} />) : ('') }
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
                onChange={handleRegisterFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Confrim Password *
              </label>
              <input
                type="password"
                className="form-control custom-form-control"
                name="password_confirmation"
                id="password_confirmation"
                onChange={handleRegisterFormChange}
                required
              />
              {'password' in errors ? (<Error errors={errors['password']} />) : ('') }
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-dark" disabled={isLoading}>
                Sign Up
                {isLoading && (<span class="spinner-border spinner-border-sm text-light ms-2"></span>)}
              </button>
            </div>

         
          </form>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="text-center">
            Already have an account? <Link className="font-gh" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
