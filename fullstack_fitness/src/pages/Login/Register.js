import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const redirectUser = () => {
    navigate('/home')
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend login endpoint
      const response = await axios.post('http://localhost:49146/api/users/login', {
        email: email,
        password: password,
      });

      // Handle the response accordingly (e.g., redirect on success)
      console.log('Login Successful', response.data);
      toast.success(`Welcome ${response.data.firstname}!`)
      redirectUser()
    } catch (error) {
      // Handle errors (e.g., show an error message)
      toast.error(error.message)
      console.error('Login Failed', error.response.data);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#a9a9a9" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "50px" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Register An Account</h3>

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
                  <button className="btn btn-primary btn-md btn-block" type="submit">Register</button>
                </form>

                <hr className="my-4" />
                
                <Link to="/" style={{textDecoration:'none'}}>
                  <p><FontAwesomeIcon icon={faLongArrowLeft}/> Already have an account? Login.</p>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
