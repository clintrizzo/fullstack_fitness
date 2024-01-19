import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../components/Loader/Loader';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const redirectUser = () => {
    navigate('/');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const currentDate = new Date();
      const response = await axios.post('http://localhost:5001/api/users', {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        username: userName,
        creationdate: currentDate.toISOString(),
      });

      console.log('Registration Successful', response.data);
      toast.success(`Welcome ${response.data.firstname}!`);
      setTimeout(() => {
        redirectUser()
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email or username already exists. Please choose a different one.');
      } else {
        toast.error('Registration Failed. Please try again.');
        console.error('Registration Failed', error.response ? error.response.data : error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="vh-100" style={{ backgroundColor: "#a9a9a9", marginTop:'-70px'  }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "50px" }}>

              {isLoading ? (
                  <Loader />
              ) : (
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Register An Account</h3>

                <form onSubmit={handleRegister}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      placeholder='User Email'
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      placeholder='User Password'
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="first-name"
                      id="typeFirstNameX-2"
                      placeholder='First Name'
                      className="form-control form-control-lg"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="last-name"
                      id="typeLastNameX-2"
                      placeholder='Last Name'
                      className="form-control form-control-lg"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="user-name"
                      id="typeUserNameX-2"
                      placeholder='User Name'
                      className="form-control form-control-lg"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary btn-md btn-block" type="submit" disabled={isLoading}>
                  <FontAwesomeIcon icon={faDumbbell}/> {isLoading ? 'Creating Account...' : 'Create New Account'}
                  </button>
                </form>

                <hr className="my-4" />
                
                <Link to="/" style={{textDecoration:'none', color: 'blue'}}>
                  <p style={{textDecoration:'none', color: 'blue', fontSize:'15px'}}><FontAwesomeIcon icon={faLongArrowLeft}/> Already have an account? Login.</p>
                </Link>
                <ToastContainer />
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
