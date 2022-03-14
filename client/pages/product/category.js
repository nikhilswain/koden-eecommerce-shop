import React, { useState, useEffect } from 'react'
import Nav from '../../components/nav'

export default function ProductsByCategory() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const categories = ['clothes', 'electronics', 'cosmetics', 'others'];

  useEffect(async () => {
    try {
      await categories.forEach(async category => {
        const res = await fetch(`/api/product/category/${category}`);
        const data = await res.json();
        setProducts([...products, {item: data, category}]);
      });
      console.log(products);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <Nav />
      {
        loading ?
          <div className='text-purple-700'>
            <h1>Loading...</h1>
          </div>
          :
          <div>
            {
              products.length > 0 ?
              products.map((product, i) => (
                <div key={i}>
                  <h1>{product.category}</h1>
                  <div className='grid grid-cols-3 grid-flow-row auto-rows-max place-items-center gap-8'>
                    {
                      // product.items.map((product, i) => (
                      //   <Link href={`/product/${product.data[i]._id}`} key={i}>
                      //     <a className="hover:bg-gray-300">
                      //       <div className='w-56' >
                      //         <div className={styles.image}>
                      //           <img src={product.data[i].image || `https://dummyimage.com/600x400/000/fff&text=${product.data[0].name}`} />
                      //         </div>
                      //         <div className='text-center'>
                      //           <h1 className='text-lg'>{product.data[0].name}</h1>
                      //           <p className='text-base'>₹ {product.data[0].price}</p>
                      //         </div>
                      //       </div>
                      //     </a>
                      //   </Link>
                      // ))
                      JSON.stringify(product.items)
                    }
                  </div>
                </div>
              )) : <div>No products found</div>
            }
          </div>
      }
    </div>
  )
}
