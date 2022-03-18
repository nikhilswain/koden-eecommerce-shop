import React from 'react'
import { useAuth, useReset } from '../services/hooks'
import Link from "next/link";


export default function Nav() {

  function Logout() {
    useReset();
  }

  return (
    <div>
        <div>
            
        </div>
        <nav className='flex justify-around items-center py-5 bg-gray-500 text-white'>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
            <ul className='flex gap-5 items-center'>
              <li>
                  {
                      useAuth() ? (
                          <div className='flex gap-6 items-center'>
                            <Link href="/profile"><a>My Profile</a></Link>
                            <Link href="/orders"><a>My Orders</a></Link>
                            <Link href="/cart" >
                              <a className='flex gap-2 items-center' title="cart">
                                <img src='/cart.svg' alt='cart' className='w-6 h-6'/>
                              </a>
                            </Link> 
                            <Link onClick={Logout} href="#">Logout</Link>
                          </div>
                      ) : (
                          <Link href="/login">Login</Link>
                      )
                  }
              </li>
            </ul>
        </nav>
    </div>
  )
}
