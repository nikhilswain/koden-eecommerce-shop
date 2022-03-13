import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/product/all')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  return (
    <div className={styles.container}>
      {
        loading ? 
        (
          <div className={styles.loading}>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className={styles.products}>
            {
              products.map((product, i) => (
                <div className={styles.product} key={i}>
                  <div className={styles.image}>
                    <img src={product.image || `https://dummyimage.com/600x400/000/fff&text=${product.name}`} width={200} height={200} />
                  </div>
                  <div className={styles.info}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
