import styles from '../styles/Home.module.css'
import Nav from '../components/nav'
import Link from "next/link";


import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/product/latest')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
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
          <div className='py-10 grid grid-cols-3 grid-flow-row auto-rows-max place-items-center gap-8'>
            {
              products.map((product, i) => (
                <Link href={`/product/${product._id}`} key={i}>
                <a className="hover:bg-gray-300">
                  <div className='w-56' >
                    <div className={styles.image}>
                      <img src={product.image || `https://dummyimage.com/600x400/000/fff&text=${product.name}`} />
                    </div>
                    <div className='text-center'>
                      <h1 className='text-lg'>{product.name}</h1>
                      <p className='text-base'>₹ {product.price}</p>
                    </div>
                  </div>
                </a>
                </Link>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
