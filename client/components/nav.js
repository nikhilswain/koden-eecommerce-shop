import React from 'react'
import styles from './nav.module.css'

export default function Nav() {
  return (
    <div>
        <div>
            
        </div>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
    </div>
  )
}
