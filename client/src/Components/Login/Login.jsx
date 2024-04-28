import React, { useState,useEffect  } from 'react'
import {useNavigate} from 'react-router-dom' 
import logo from '../../assets/logo.png'
import SwalCustom from '../Swal/custom' 
import { UseAuth } from '../Auth/AuthContext';
import { login } from '../API/authService';

// import "../../assets/Login.css"
const LoginComponent = () =>{
  const navigate = useNavigate()
  const [email,setEmail] = useState() 
  const [password,setPassword] = useState()  
  const [isloading, setIsloading] = useState(false);
  const loadingHtml = ()=>{
    return(
      <>
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div> <span>Loading...</span>
      </>
    )
  }
  
  const auth = UseAuth(); 


  useEffect(() => {
    document.title = "Login Application - MGS ERP"
  }, []);
 
  useEffect(() => {
  if (auth.user ) {
    navigate('/dashboard');
  }
  }, [auth.user, navigate]); 
  const handleSubmit = async (event) =>{
    event.preventDefault();
    if (isloading === true) return
    try {
      setIsloading(true); 
      const data = await login(email, password);
      if(data.status === 201){
        SwalCustom.fire({
          title: 'Login Failed',
          text: 'Username tidak ditemukan',
          icon: 'error',
          confirmButtonText: 'Submit'
        })
      } 
      if(data.status === 202){
        SwalCustom.fire({
          title: 'Login Failed',
          text: 'password tidak sesuai',
          icon: 'error',
          confirmButtonText: 'Submit'
        })
      } 
      if(data.status === 500){
        SwalCustom.fire({
          title: 'Error Server',
          text: 'ada kesalahan pada server',
          icon: 'error',
          confirmButtonText: 'Submit'
        }) 
      }
      const datas = data.data.payload.data[0]
      if(data.status === 200){
        SwalCustom.fire({
          title: 'Login success',
          text: 'Berhasil login aplikasi',
          icon: 'success',
          confirmButtonText: 'Submit'
        }).then((result) => {
          if (result.isConfirmed) { 
            auth.login({datas}); 
          } 
        }) 
      }  
      setIsloading(false); // Stop loading

    } catch (error) {
      SwalCustom.fire({
        title: 'Error Server',
        text: error,
        icon: 'error',
        confirmButtonText: 'Submit'
      })
      setIsloading(false);
    } 
  }
  return(  
    <section className='bg-gradient-to-r  from-[#e2e2e2]  to-[#c9d6ff] h-screen flex items-center justify-center'>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src={logo} alt="logo"/> MGS ERP   
          </span>
          <div className="w-80 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in
                  </h1>  
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                          <input 
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={email || ''}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Username"
                            required/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input onChange={(e) => setPassword(e.target.value)}  value={password  || ''} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div className="items-center justify-between hidden"> 
                          <span  onClick={() => {navigate("/forgot")}} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</span>
                      </div>
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={isloading ? true : false}>
                        
                        {
                        (isloading === true) ? 
                        loadingHtml() : 
                        "Sign in"
                      }
                        
                        </button>
                      <p className="hidden text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet?  <span  onClick={() => {navigate("/register")}} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</span>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section> 
  )
}

export default LoginComponent;
