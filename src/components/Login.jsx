import React from 'react'

function Login() {
  return (
    <div className="w-[100%] h-[100vh] bg-gray-300 flex justify-center items-center">
    <div className="w-[80%] md:w-[50%] lg:w-[30%] h-[80%] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
     <input type="text" placeholder='Email adress' className="w-[80%] h-[3rem] border-1 border-gray-400 rounded-xl py-1.5 px-3" /> <br />
     <input type="text" placeholder='password' className="w-[80%] h-[3rem] border-1 border-gray-400 rounded-xl py-1.5 px-5" /> <br />
     <button className="text-black hover:bg-blue-400 cursor-pointer transition rounded-2xl py-=2 px-8npm r ">
        Login</button>
          <a href="https://www.youtube.com" className='text-black no-underline hover:underline hover:decoration-black-500'>Forgotten account?</a>
         


    </div>

    </div>
  )
}

export default Login