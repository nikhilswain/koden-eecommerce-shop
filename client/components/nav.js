import React from 'react'
import styles from './nav.module.css'

export default function Nav() {
  return (
    <div>
        <div>
            
        </div>
        <nav className='flex justify-around items-center py-5 bg-gray-500 text-white'>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
            </ul>
            <ul className='flex gap-5'>
            <li className=''>
                <a href="/login">Login</a>
            </li>
            <li>
                <a href="/cart">cart</a>
            </li>
            </ul>
        </nav>
    </div>
  )
}
