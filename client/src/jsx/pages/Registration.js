import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import {
  loadingToggleAction,
  signupAction,
} from '../../store/actions/AuthActions';
// image
import logo from "../../images/logo-full.png";

function Register(props) {
  const rolesType = ["Admin","Director","CHead","TeamLeader","SalesPerson","MarketingPerson"]
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [phone, setPhone] = useState('');
  const [parentId, setParentId] = useState('');
  const [roles, setRole] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (e) => {
    console.log(e.target.value);
    setRole(e.target.value)
  }

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
    }
    setErrors(errorObj);
    if (error) return;
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(name, email, phone, parentId, roles, password, navigate));
  }
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    {props.errorMessage && (
                      <div className=''>
                        {props.errorMessage}
                      </div>
                    )}
                    {props.successMessage && (
                      <div className=''>
                        {props.successMessage}
                      </div>
                    )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          placeholder="username"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Phone No.</strong>
                        </label>
                        <input
                          type="Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control"
                          placeholder="phone no."
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Parent Id</strong>
                        </label>
                        <input
                          type="Number"
                          value={parentId}
                          onChange={(e) => setParentId(e.target.value)}
                          className="form-control"
                          placeholder="parentId"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Role</strong>
                        </label>

                        {/* <Dropdown>
                          <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Dropdown Button
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            id="dropdown-menu-align-right"
                            onSelect={handleSelect}>
                            <Dropdown.Item key="Director">Action</Dropdown.Item>
                            <Dropdown.Item key="Director">Another action</Dropdown.Item>
                            <Dropdown.Item key="Director">Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <select
                          value={role}
                          onSelect={(e) => setRole(e.target.value)}
                          className="form-control" >
                          <option value='Director'> Director</option>
                          <option value='Ched'> Ched</option>
                          <option value='TeamLeader'> TeamLeader</option>
                          <option value='SalesPerson'> SalesPerson</option>
                          <option value='Marketer'> Marketer</option>
                        </select> */}
                        <select onChange={handleSelect} className="form-control">
                          <option>Roles</option>
                          {rolesType.map((option, index) => {
                            return <option key={index} >
                              {option}
                            </option>
                          })}
                        </select>

                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          className="form-control"
                          defaultValue="Password"
                          placeholder="password"
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                      </div>



                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign me up
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Register);

