import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/UserAction";
import { Link } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";
import ErrorAlert from "../../misc/ErrorAlert";

const RegisterPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordCheckShown, setPasswordCheckShown] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/login";

  useEffect(() => {
    document.title = "Register | A S K Hospitals";
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      // cleanup
    };
  }, [userInfo, props.history, redirect]);
  console.log("user", userInfo);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const togglePasswordCheckVisiblity = () => {
    setPasswordCheckShown(passwordCheckShown ? false : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, passwordCheck));
    console.log(name, email, password, passwordCheck);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-4">
          <div className="image-container-reg">
            <h1>
              A S K<br /> Hospital
            </h1>
          </div>
        </div>
        <div className="col-md-4" id="login-container">
          <h2>Register an Account</h2>

          <form onSubmit={handleSubmit} className="mt-5">
            {error && <ErrorAlert message={error} />}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-user fa-lg" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" />
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-lock fa-lg " />
                </span>
              </div>
              <input
                type={passwordShown ? "text" : "password"}
                className="form-control"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  {!passwordShown ? (
                    <i
                      className="fa fa-eye-slash"
                      onClick={togglePasswordVisiblity}
                    />
                  ) : (
                    <i
                      className="fa fa-eye"
                      onClick={togglePasswordVisiblity}
                    />
                  )}
                </span>
              </div>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-lock fa-lg " />
                </span>
              </div>
              <input
                type={passwordCheckShown ? "text" : "password"}
                className="form-control"
                value={passwordCheck}
                name="passwordCheck"
                onChange={(e) => setPasswordCheck(e.target.value)}
                placeholder="Re-enter Password"
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  {!passwordCheckShown ? (
                    <i
                      className="fa fa-eye-slash"
                      onClick={togglePasswordCheckVisiblity}
                    />
                  ) : (
                    <i
                      className="fa fa-eye"
                      onClick={togglePasswordCheckVisiblity}
                    />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-warning btn-block"
              id="add-cart"
            >
              Register
            </button>
            <h6 className="mt-4">Already have an account?</h6>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button
                id="create-acc"
                type="submit"
                className="btn btn-primary btn-block mt-4"
              >
                Sign-In
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
