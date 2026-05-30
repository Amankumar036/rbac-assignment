import { useState } from "react";
import { toast } from "react-toastify";
import { userLogin } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
 
    const navigate=useNavigate();
    const [data,setData]=useState({
            
            email:"",
            password:"",
           
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
            const response = await userLogin(data);
            const {token,role}=response.data;
            localStorage.setItem("token",token);
            localStorage.setItem("role",role);

            if(role==="USER"){
                navigate("/user-dashboard")
            }
            else if(role==="ADMIN"){
                navigate("/admin-dashboard")
            }else{
                navigate("/public-home")
            }
            
        } catch (error: any) {
            console.log("Error:", error.response?.data || error.message);
            toast.error("Something went wrong");
        }
        }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={onSubmitHandler}>
          
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
          
          <button type="submit" className="w-full bg-black text-white p-2 rounded-md mt-4 hover:bg-gray-800">Login</button>
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
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-black font-semibold hover:underline"
  >
    Register here
  </Link>
</p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;