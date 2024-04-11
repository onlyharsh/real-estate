import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import Footer from "../components/Footer";
import {toast} from "react-toastify"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function SignUp() {
  const [showPassword,setShowPassword]=useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
 }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        toast.error("user already exists")
        return;
      }
      toast.success(data.message);
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong!")
      
    }
  };
  return (
    <div className="bg-cover bg-center h-[410px] sm:h-[500px]">
       <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Name"
          className="border capitalize p-3 rounded-lg"
          id="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <div className='relative flex '>
           <input
          type={showPassword? 'text' : 'password'}
          placeholder="Password"
          className="border p-3 rounded-lg w-full"
          id="password"
          onChange={handleChange}
        />
        <span onClick={handleShowPassword} className="cursor-pointer absolute right-3 top-3.5 ">
        {showPassword?< AiOutlineEyeInvisible fontSize={24}/> :<AiOutlineEye fontSize={24}/>}
        </span>
        </div>
           <input
          type="text"
          placeholder="Contact No."
          className="border p-3 rounded-lg"
          id="phone"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading" : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Log in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
    <Footer/>
    </div>
   
  );
}
