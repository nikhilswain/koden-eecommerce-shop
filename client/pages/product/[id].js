import React, { useState, useEffect } from 'react'
import Nav from '../../components/nav'
import Route from 'next/router'

export async function getServerSideProps(context) {
  return {
      props: {
          id: context.params.id
      }
  }
}

export default function ProductSpecificPage(props) {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/product/' + props.id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProduct(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
      console.log(loading);
  }, [])

  const toCart = () => {
    Route.push('/cart')
  }
  
  const buyNow = () => {
    Route.push('#')
  }

  return (
    <div>
      <Nav />
    {
      
          loading === true ?
        (
        <div>
          <h1>Loading...</h1>
        </div>
        )
        :
        (
        <div className='grid py-6 px-8 gap-2'>
          <div className='flex gap-6'>
            <div className='w-80'>
              <img src={product.image || `https://dummyimage.com/600x400/000/fff&text=${product.name}`} />
            </div>
            <div className='text-left flex flex-col gap-2'>
              <h1 className='text-2xl'>{product.name}</h1>
              <p className='text-lg'>{product.description}</p>
              <p className='text-lg'>₹ {product.price}</p>
              {
                (product.quantity > 0) ? <p className=' text-base text-green-500'>In stock</p> : <p className='text-base text-red-600'>Out of stock</p>
              }
            </div>
            </div>
            <div className='flex gap-4'>
              <button onClick={() => buyNow()} className='bg-red-500 hover:bg-red-600 text-white text-lg py-1 px-9'>Buy Now</button>
              <button onClick={() => toCart()} className='bg-orange-500 hover:bg-orange-600 text-white text-lg py-1 px-9'>Add to Cart</button>
            </div>
          </div>
          )
    }
    </div>
  )
}
