import React, { useState, useEffect, useRef } from 'react'
import { useBearer } from '../services/hooks'
import Route from 'next/router';

/*
* 'type' prop can be 'checkout' or 'cart'.
* 'addresses' is list of addresses of the user
* 'selectedAddress' is the address that the user will selected from the dropdown for checkout
*/

export default function ({ product, cart, type, closeCallback }) {
  const modalRef = useRef();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(async () => {
    try {
      const addressesRef = await fetch('/api/address', {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      });
      const addressesData = await addressesRef.json();
      if (addressesRef.ok === true) {
        console.log(addressesData);
        setAddresses(addressesData.addresses);
        setLoading(false);
      } else {
        alert(addressesData.message);
      }
      modalRef.current.showModal();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function checkoutCart() {
    if (selectedAddress === '' || selectedAddress === undefined) {
      alert('Please select an address');
      return;
    }
    try {
      const res = await fetch('/api/cart/checkout', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        },
        body: JSON.stringify({
          address: selectedAddress
        })
      });
      const data = await res.json();
      if (res.ok === true) {
        Route.push('/orders/' + data.order._id);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function checkoutProduct() {
    if (selectedAddress === '' || selectedAddress === undefined) {
      alert('Please select an address');
      return;
    }
    try {
      const res = await fetch(`/api/product/${product._id}/checkout`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        },
        body: JSON.stringify({
          address: selectedAddress,
          quantity: 1
        })
      });
      const data = await res.json();
      if (res.ok === true) {
        Route.push('/orders/' + data.order._id);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function closeModal() {
    modalRef.current.close();
    closeCallback();
  }

  if (loading === true) {
    return (
      <div className='fixed top-1/2 left-1/2'>
        {/* add spinner or something with position as fixed & center */}
        <h1>loading</h1>
      </div>
    )
  } else {
    return (
      <dialog ref={modalRef} className='relative w-9/12 border min-h-96' >
          <button className='absolute top-3 right-3 border-none focus:outline-none' onClick={closeModal}>
            <span className='text-red-500 text-lg'>&times;</span>
          </button>
          <h1 className='text-center font-black text-2xl mb-4'>{type.toUpperCase()} CHECKOUT</h1>
          <div className='mb-8' >
            <h2 className='text-lg font-bold'>Select an Address for Shipment</h2>
            {/* make it as dropdown input, i.e. user can select one of the addressees; selected address will go in 'selectedAddress' state */}
            {
              loading ?
                <div>Loading...</div>
              :
                (
                  <div>
                  {
                    addresses.map(address => (
                      <div key={address._id}>
                        <input name={address._id} type='radio' className='mr-3' onChange={e => {setSelectedAddress(e.target.value)}} value={address._id} />
                        <label id={address._id}>{(address.line1)}</label> 
                      </div>
                    ))
                  }
                  </div>
                )
            }
          </div>
          <hr />
          <div>
              {
                type === 'cart' ?
                  <>
                    <h1 className='text-center text-2xl my-5 font-bold'>Products</h1>
                    {/* can show stuff like total price etc, take data from  */}
                    <div className='grid grid-cols-3 gap-8 items-center justify-center'>
                    {
                      cart.map(item => (
                        <div className='grid gap-2 text-center' key={item._id}>
                          <p><span className='font-bold'>Name: </span>{item.product.name}</p>
                          <p><span className='font-bold'>Category: </span>{item.product.category}</p>
                          <p><span className='font-bold'>Total Price: </span>{item.product.price}</p>
                        </div>
                      ))
                    }
                    </div>
                    <div className='flex mt-10'>
                      <button className='bg-red-400 text-white px-5 py-2 rounded-sm mx-auto hover:bg-red-600' onClick={checkoutCart}>Buy Now</button>
                    </div>
                  </>
                :
                  <>
                    <h1 className='text-center my-5 text-2xl font-bold'>Product</h1>
                    {/* can show more details about product, i.e. take data from parent component thru prop 'product' object. */}
                    {
                      <div className='grid gap-2' key={product._id}>
                        <p><span className='font-bold'>Name: </span>{product.name}</p>
                        <p><span className='font-bold'>Category: </span>{product.category}</p>
                        <p><span className='font-bold'>Total Price: </span>{product.price}</p>
                      </div>
                    }
                    <div className='flex'>
                      <button className='bg-red-400 text-white px-5 py-2 rounded-sm mx-auto hover:bg-red-600' onClick={checkoutProduct}>Buy Now</button>
                    </div>
                  </>
              }
          </div>
      </dialog>
    )
  }
}
