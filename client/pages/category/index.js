import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Nav from '../../components/nav'

export default function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(async () => {
    try {
      const res = await fetch('/api/product/category')
      const data = await res.json()
      console.log(data);
      setCategory(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }, []);

  return (
    <div>
      <Nav />
      {
        loading ?
        <div>Loading...</div>
        :
        (
          <>
            <h1 className='text-3xl text-black text-center py-3'>Categories</h1>
            <div className='grid grid-cols- sm:grid-cols-2 items-center'>
              {category.map((category, i) => (
                // create a kindof card component here for each category
                <div key={i} className="w-80 sm:w-72 md:w-80 lg:w-96 mx-auto bg-white shadow-xl rounded my-8">
                  <Link href={`/category/${category}`}>
                  <a>
                    <div >
                      <img src={'https://dummyimage.com/600x400/000/fff&text='+category} alt={category} />
                      <p className='py-3 px-2 text-center text-bolder'>{category}</p>
                    </div>
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
