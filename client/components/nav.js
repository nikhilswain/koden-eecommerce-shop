import React from 'react'
import styles from './nav.module.css'
import { useUser } from '../services/hooks'

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
            <ul className='flex gap-5 items-center'>
            <li>
                {
                    useUser() ? (
                        <a href="/user">My Profile</a>
                    ) : (
                        <a href="/login">Login</a>
                    )
                }
            </li>
            <li>
                <a href="/cart" className=' flex gap-2 items-center'>
                <img width={30} src='data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxLjUsMTVhMywzLDAsMCwwLTEuOS0yLjc4bDEuODctN2ExLDEsMCwwLDAtLjE4LS44N0ExLDEsMCwwLDAsMjAuNSw0SDYuOEw2LjQ3LDIuNzRBMSwxLDAsMCwwLDUuNSwyaC0yVjRINC43M2wyLjQ4LDkuMjZhMSwxLDAsMCwwLDEsLjc0SDE4LjVhMSwxLDAsMCwxLDAsMkg1LjVhMSwxLDAsMCwwLDAsMkg2LjY4YTMsMywwLDEsMCw1LjY0LDBoMi4zNmEzLDMsMCwxLDAsNS44MiwxLDIuOTQsMi45NCwwLDAsMC0uNC0xLjQ3QTMsMywwLDAsMCwyMS41LDE1Wm0tMy45MS0zSDlMNy4zNCw2SDE5LjJaTTkuNSwyMGExLDEsMCwxLDEsMS0xQTEsMSwwLDAsMSw5LjUsMjBabTgsMGExLDEsMCwxLDEsMS0xQTEsMSwwLDAsMSwxNy41LDIwWiIvPjwvc3ZnPg=='></img>
                <span>Cart</span> 
                </a>
            </li>
            </ul>
        </nav>
    </div>
  )
}
