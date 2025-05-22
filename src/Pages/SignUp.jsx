import React, {useContext, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AuthContext } from '../Contexts/AuthContext';
import { ModeContext } from '../DarkLightMode/ModeContext';


const SignUp = () => {
  const { darkMode } = useContext(ModeContext);
  const {resister,googleSignin}=useContext(AuthContext);

    const [show, setShow] = useState(false);
    const[success,setSuccess]=useState(false);
    
   
    const handleResister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        resister(email,password,name,photo)
        .then(() => {
            
            toast.success("Registration successful");
           
            setSuccess(true)
            
          })
          .catch((error) => {
            // console.error(error);
            
          });
    }
    if (success) {
        return <Navigate to="/" replace />;
      }

      
    
      const handleGoogleSignup = () => {
        googleSignin(true)
          .then((result) => {
            const user = result.user;
            // console.log("User Info:", user);
            setSuccess(true);
          })
          .catch((error) => {
            console.error("Error during Google Signin:", error);
          });
      };
      
      
    
    return (
        <div className={darkMode?"bg-black text-white":"bg-slate-100"}>
           <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className=" shadow-2xl">
            <div className={darkMode?"card-body bg-slate-800 shadow-2xl text-white rounded-2xl":"card-body rounded-2xl"}>
              {/* fieldset lg:width */}
              <form onSubmit={handleResister} className={darkMode?"fieldset lg:width bg-slate-800 text-white p-2":"fieldset lg:width"}>
                <h2 className="text-3xl font-semibold mb-4">Sign Up Now!</h2>
                <label className={darkMode?"bg-slate-800 label text-white":" text-black"}>Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className={darkMode?"input input-bordered border-gray-300 rounded-lg placeholder-white outline-none  w-full bg-slate-800 text-white":"border-gray-300 rounded-lg text-black input input-bordered w-full"}
                  required
                />

<label className={darkMode?"bg-slate-800 label text-white":" text-black"}>Photo</label>
                <input
                  name="photo"
                  type="text"
                  placeholder="photo"
                  className={darkMode?"input input-bordered border-gray-300 rounded-lg placeholder-white outline-none  w-full bg-slate-800 text-white":"border-gray-300 rounded-lg text-black input input-bordered w-full"}
                  required
                />

                <label className={darkMode?"bg-slate-800 label text-white":" text-black"}>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={darkMode?"input input-bordered border-gray-300 rounded-lg placeholder-white outline-none  w-full bg-slate-800 text-white":"border-gray-300 rounded-lg text-black input input-bordered w-full"}
                  required
                />

                <label className={darkMode?"bg-slate-800 label text-white":" text-black"}>Password</label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                  <input
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    // flex-1 outline-none
                    className={darkMode?"flex-1 outline-none bg-slate-800 text-white placeholder-white":"flex-1 outline-none"}
                    required
                  />
                  <div
                    onClick={() => setShow(!show)}
                    className="cursor-pointer text-xl text-gray-500 ml-2"
                  >
                    {show ? <FaEyeSlash color="red" size={24} /> : <FaEye color="blue" size={24} />}
                  </div>
                </div>

                
                <button className="btn btn-neutral mt-4">Resister</button>
              </form>


              <button onClick={handleGoogleSignup} className="btn bg-slate-200 text-black shadow-2xl border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Sign Up with Google
</button>


              <p>
                 Have any account?
                <Link to={"/signin"} className='color ml-2'>Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div> 
        </div>
    );
};

export default SignUp;