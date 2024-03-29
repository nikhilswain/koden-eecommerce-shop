import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import Link from "next/link";

export default function Product() {
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
  }, []);

  return (
    <div className='h-screen'>
        <Nav />
      {
        loading ? 
        (
          <div className='w-full h-full grid place-items-center'>
            loading...
          </div>
        ) : (
          <div className='py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row auto-rows-max place-items-center gap-8'>
            {
              products.map((product, i) => (
                <Link href={`/product/${product._id}`} key={i}>
                <a className="bg-gray-100 hover:shadow-xl hover:bg-gray-200 w-80 sm:w-60">
                  <div className='w-full' >
                    <div>
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
