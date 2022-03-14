import styles from '../styles/Home.module.css'
import Nav from '../components/nav'


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
    <div>
        <Nav />
      {
        loading ? 
        (
          <div className='text-purple-700'>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className='py-10'>
            {
              products.map((product, i) => (
                <div className='w-56' key={i}>
                  <div className={styles.image}>
                    <img src={product.image || `https://dummyimage.com/600x400/000/fff&text=${product.name}`} />
                  </div>
                  <div className='text-center'>
                    <h1 className='text-lg'>{product.name}</h1>
                    <p className='text-base'>{product.price}</p>
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
