import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/nav';

export async function getServerSideProps(context) {
  return {
    props: {
      category: context.params.id
    }
  }
}

export default function CategorySpecificPage({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(async () => {
    try {
      const products = await fetch(`/api/product/category/${category}`);
      const data = await products.json();
      console.log(data);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  }, [])

  return (
    <div>
      <Nav />
      {
        loading ?
          <h1>Loading...</h1>
          :
          (
            <>
              <h1 className='text-3xl text-black text-center py-3'>CATEGORIES / <span className='font-light'>{category.toLowerCase()}</span></h1>
              <div className='grid grid-cols-3 gap-4 p-4'>
                {products.map(product => (
                  <div key={product._id} className='bg-white rounded shadow-lg p-4'>
                    <Link href='/product/[id]' as={`/product/${product._id}`}>
                      <a className='block text-center'>
                        <img src={product.image || `https://dummyimage.com/600x400/000/fff&text=${product.name}`} alt={product.name} className='w-full h-64 object-cover' />
                        <h3 className='text-xl text-black mt-2'>{product.name}</h3>
                        <p className='px-4 py-3 text-sm text-gray-600 truncate'>{product.description}</p>
                        <p className='text-lg'>{product.price}</p>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )
      }
      <p className='text-center py-4 text-red-500'>{error}</p>
    </div>
  )
}
