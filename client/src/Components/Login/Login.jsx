import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom' 
import logo from '../../logo.png'

const LoginComponent = () =>{
  const navigate = useNavigate()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()

  const handleSubmit = (event) =>{
    event.preventDefault();

    // Ini hanya simulasi, dalam produksi anda perlu verifikasi dengan backend
    if (email === 'user@example.com' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  }
  return(  
    <section>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <span onClick={() => {navigate("/Dashboard")}} class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img class="w-8 h-8 mr-2" src={logo} alt="logo"/> DIGIPAM    
          </span>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in
                  </h1>  
                  <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input 
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input onChange={(e) => setPassword(e.target.value)}  value={password} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div class="flex items-center justify-between">
                          <div class="flex items-start">
                              <div class="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                              </div>
                              <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                              </div>
                          </div>
                          <span  onClick={() => {navigate("/register")}} class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</span>
                      </div>
                      <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet?  <span  onClick={() => {navigate("/register")}} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</span>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section> 
  )
}

export default LoginComponent;
