import React, { useState, useEffect } from 'react'
import { useBearer } from '../../services/hooks'
import Nav from '../../components/nav'
import Checkout from '../../components/checkout'
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
  const [isOpen, setIsOpen] = useState(false)

  useEffect(async () => {
    try {
      const productRes = await fetch('/api/product/' + props.id)
      const productData = await productRes.json()
      if (productRes.ok === true) {
        setProduct(productData);
        setLoading(false);
      } else {
        alert(productData.message);
      }
    } catch (error) {
      console.log(error); 
      setLoading(false);
    }
  }, [])

  const toCart = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cart', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        },
        body: JSON.stringify({
          product: product._id,
          quantity: 1
        })
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      Route.push('/cart');
    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  const buyNow = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Nav />
    {
      loading === true ? (
        <div>
          <h1>Loading...</h1>
        </div>
      )
      : (
        <div className='grid py-6 px-8 gap-2'>
          { isOpen ? <Checkout closeCallback={buyNow} product={product} type={'product'} /> : null }
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
            <button onClick={() => buyNow()} className='bg-red-500 hover:bg-red-600 text-white text-lg py-1 px-4'>Checkout Now</button>
            <button onClick={() => toCart()} className='bg-orange-500 hover:bg-orange-600 text-white text-lg py-1 px-7'>Add to Cart</button>
          </div>
        </div>
      )
    }
    </div>
  )
}
