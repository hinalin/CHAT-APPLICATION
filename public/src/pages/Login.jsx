import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
    {/* <div style = {{
      backgroundImage:
      'url("https://t3.ftcdn.net/jpg/01/62/47/66/360_F_162476658_ZoIJ9RKaoch0eTLQck8yxQMEuLsPkQ19.jpg")',backgroundSize:'cover',
      backgroundRepeat: "no-repeat"
   }}> */}
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h2>SNAPTALK</h2>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">CreateNew</Link>
          </span>
          </div>
          </form>
      </FormContainer>
      <ToastContainer />
      {/* </div> */}
    </>
  );
}

const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:black;
.brand{
    display: flex;
    flex-direction:column;
    align-items:center;
    gap:1rem;
    justify-content:center;
img{
        height:15rem;
        border-radius:50%;
}
h2{
      margin-top:-4rem;
      color: white;
      text-transform:uppercase;
  }
   
}

form{
  display: flex;
  flex-direction: column;
  background-color:transparent;
  border-radius:2rem;
  padding: 1rem 3rem;

input{
  background-color:transparent;
  padding:1rem;
  border-radius:0.5rem;
  width:90%;
  font-size:1rem;
  color:white;
  &:focus{
    border:3px solid gray;
    outline:none;
  }
}

button{
  border-radius:0.4rem;
  padding:0.5rem 0.5rem;
  border:none;
  font-weight:bold;
  cursor:pointer;
  font-size:1rem;
  transition:0.5s ease-in-out;
  width:100px;
  &:hover{
    background-color:green;
    color:white;
    border-radius:1rem;
  }
}

span{
  color:white;
  a{
    color:gray;
    text-transform:none;
    text-decoration:none;
    &:hover{
      color:white;
    }
  }
}

}
`;
