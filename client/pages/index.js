import React from 'react'
import Nav from '../components/nav'

export default function Home() {
  return (
     <div>
       <Nav />
       <div className="py-6">
        <h1 className="text-2xl text-gray-500 font-medium text-center">Online Shopping Platform</h1>
        </div>
        <div className='flex justify-center items-center flex-col gap-5'>
          {/* login and signup button */}
          <img src='/shop.svg' alt='Shopping icon' width={"350px"} height={"300px"}/>
          <div className='flex justify-center gap-10'>
            <a href='/signup' className="text-blue-500 font-medium text-center">Signup</a>
            <a href='/login' className="text-blue-500 font-medium text-center">Login</a>
          </div>
        </div>
         
    </div>
  )
}
