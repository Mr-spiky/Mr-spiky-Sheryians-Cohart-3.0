import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";

export const useAuth = () => {
  let navigate = useNavigate();
    const { register , reset, handleSubmit, formState: { errors } } = useForm();


  let { loggedInUser, setLoggedInUser, registeredUsers, setRegisteredUsers } =useContext(Auth);


  const loginFormSubmit = (data) => {
    console.log(data);
    let user = registeredUsers.find( user => user.email === data.email && user.password === data.password);

    if (!user) {
      alert("Invalid email or password");
      reset();
      return;
    } else {
      setLoggedInUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful");
      navigate("/main");
    }
    reset();
  };
  const registerFormSubmit = (data) => {
    console.log(data);
    let arr = [...registeredUsers, data];
    setRegisteredUsers(arr);
    localStorage.setItem("registeredUsers", JSON.stringify(arr));
    reset();
  };

  return{register, reset, handleSubmit, errors, loginFormSubmit, registerFormSubmit, loggedInUser, setLoggedInUser, registeredUsers, setRegisteredUsers, navigate , formState: {errors}}
};  