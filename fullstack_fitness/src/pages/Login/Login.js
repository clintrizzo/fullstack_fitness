import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const redirectUser = () => {
    navigate('/home');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post('http://localhost:49146/api/users/login', {
        email: email,
        password: password,
      });
  
      const user = response.data.user;
      const username = user.firstname + ' ' + user.lastname;
  
      // Redirect after a brief delay
      setTimeout(() => {
        redirectUser();
      }, 2000);
      toast.success(`Welcome ${username}!`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.error('Login Failed', error.response.data);
    }
  };
  
  return (
    <>
    <section className="vh-100" style={{ backgroundColor: "#a9a9a9" }}>
      <div className="container py-6 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div style={{ backgroundColor:'white', borderRadius:'50px' }}>

                {isLoading ? (
                  <Loader />
                ) : (
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Login To Account</h3>
                  <form onSubmit={handleLogin}>
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

                    <button className="btn btn-primary btn-md btn-block" type="submit" style={{marginright:'25px'}}>Login</button>
                    <button className="btn btn-primary btn-md btn-block" style={{marginLeft:'25px'}}><Link to="/register" style={{marginLeft:'5px', color:'white', textDecoration:'none'}}> Register</Link></button>
                  </form>
                  <hr className="my-4" />
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
    <ToastContainer />
    </>
  );
};

export default Login;
