import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../api/apiService";

const RegisterPage = () => {

    const navigate=useNavigate();
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        role:""
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData((data)=>({...data,[name]:value}))
    }

    const onSubmitHandler = async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log(data);
        try {
        const response = await userRegister(data);
        navigate("/login")
        console.log("Success:", response.data);
        toast.success("Registration Completed.Please Login");
    } catch (error: any) {
        console.log("Error:", error.response?.data || error.message);
        toast.success("Something went wrong");
    }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <label
              htmlFor="name-alternative"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Name
            </label>
            <input
              type="text"
              id="name-alternative"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Aman Sharma"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email-alternative"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your email
            </label>
            <input
              type="email"
              id="email-alternative"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="name@gmail.com"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password-alternative"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your password
            </label>
            <input
              type="password"
              id="password-alternative"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              required
            />
          </div>
          <label htmlFor="role" className="block mb-2.5 text-sm font-medium text-heading">Select an option</label>
          <select id="role" 
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
           name="role"
           onChange={onChangeHandler}
           value={data.role} >
            <option value="">Choose a role</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
    
           </select>
          <button type="submit" className="w-full bg-black text-white p-2 rounded-md mt-4 hover:bg-gray-800">Register</button>
          <p className="text-center mt-4 text-gray-600">
  Want to explore?{" "}
  <Link
    to="/public-home"
    className="text-blue-600 font-semibold hover:underline"
  >
    Go to Public Page
  </Link>
</p>
          <p className="text-center mt-4 text-gray-600">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/")}
    className="text-black font-semibold cursor-pointer hover:underline"
  >
    Login here
  </span>
</p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
