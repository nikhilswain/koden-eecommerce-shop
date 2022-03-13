import React from 'react'
import styles from './nav.module.css'

export default function Nav() {
  return (
    <div>
        <div>
            
        </div>
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li>
                    <a href="/">Home</a>
                </li>
            </ul>
            <ul className={styles.ul}>
            <li>
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
