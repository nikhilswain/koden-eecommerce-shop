import React, {useState, useEffect} from 'react'
import { useBearer } from '../services/hooks'
import Link from 'next/link';
import Nav from '../components/Nav'
import Checkout from '../components/checkout'

export default function Cart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [rerender, setRerender] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(async () => {
    fetch('/api/cart?p=true', {
      method: "GET",
      headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
      }
    })
    .then(res => res.json())
    .then(data => {
      setCart(data.cart)
    })
    .catch(err => console.error(err))
    .finally(() => {
      setLoading(false);
    });
  }, [rerender]);

  async function deleteItem(id) {
    try {
      setLoading(true);
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        },
        body: JSON.stringify({
          hard: true
        })
      });
      setRerender(!rerender);
      setLoading(false);
    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function addItem(id) {
    try {
      setLoading(true);
      const res = await fetch(`/api/cart/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        },
        body: JSON.stringify({
          product: id,
          quantity: 1
        })
      });
      setRerender(!rerender);
      setLoading(false);
    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function removeItem(id) {
    try {
      setLoading(true);
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      });
      setRerender(!rerender);
      setLoading(false);
    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  function checkoutCart() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Nav />      
      {
      loading ? 
      (
      <p>Loading...</p>
      )
       :
      (
        <div>
          { isOpen ? <Checkout closeCallback={checkoutCart} cart={cart} type={'cart'} /> : null }
          <div className='flex gap-2 px-2 py-8'>
          {/* https://tailwindcss.com/docs/configuration https://github.com/tailwindlabs/tailwindcss/discussions/2123 */}
          <div className=' w-2/3 grid gap-4 '>
          { cart.length === 0 ? 
              <p className='text-lg text-center font-extrabold mt-16'>Your cart is empty!</p> :
              cart.map((item,i) => (
                <div  key={i} className="bg-gray-300 ">
                  <div className='flex justify-between px-4 py-2 items-center'>
                    <div className='w-4/5'>
                    <h2 className='text-lg'><Link href={`/product/${item.product._id}`}><a>{item.product.name}</a></Link></h2>
                    <p className='text-base'>{item.product.price}</p>
                    <div className='flex gap-3'>
                      <button onClick={() => removeItem(item.product._id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addItem(item.product._id)}>+</button>
                    </div>
                    <a className='text-red-500' onClick={() => deleteItem(item.product._id)} href="#">Remove</a>
                    </div>
                      <div className='w-1/5 bg-white'>
                    <img src={item.product.image || `https://via.placeholder.com/600x400/000/fff&text=${item.product.name}`} alt={item.product.name}/>
                    </div>
                  </div>
                </div>
              ))
          }
          </div>
          {/* stick or make fix to the position */}
          <div className="w-1/3 flex flex-col gap-2 sticky top-0 ">
            <div className='w-full bg-gray-400 h-28'>
                   <h1 className='px-2 py-1'>Price Details</h1>
                   <hr />
                   <p className=' py-2 flex justify-around'> <span > Total Items</span> <span>{cart.length}</span></p>
                   <p className=' py-2 flex justify-around'> <span > Total Price</span> <span>₹ {cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}</span></p>
            </div>
            
            <button disabled={cart.length === 0} onClick={checkoutCart} className='w-full bg-orange-500 hover:bg-orange-600 text-white py-2'>Checkout</button>
          </div>
          </div>          
        </div>
       
       
      )
        }
      </div>
      )
      }
  