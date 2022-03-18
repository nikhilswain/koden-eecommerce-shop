import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav'
import { useBearer } from '../../services/hooks'
import Router from 'next/router'
import date from 'date-and-time'

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id
    }
  }
}

export default function OrderSpecificPage(props) {
  const [newAddress, setNewAddress] = useState({}) // this is the address that the user will input if he want to change the address of the order
  const [order, setOrder] = useState({})
  const [address, setAddress] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    try {
      const orderRes = await fetch(`/api/order/${props.id}?p=true`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      });
      const orderData = await orderRes.json()
      console.log(orderData)
      if (orderRes.ok === true) {
        orderData.createdAt = date.format(new Date(orderData.createdAt), 'DD MMM YYYY');
        setOrder(orderData)
        const addressRes = await fetch(`/api/address/${orderData.addressRef}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "Authorization": await useBearer()
          }
        });
        const addressData = await addressRes.json()
        console.log(addressData);
        if (addressRes.ok === true) {
          setAddress(addressData.address)
          setLoading(false)
        } else {
          alert(addressData.message)
          setLoading(false)
        }
      } else {
        alert(orderData.message)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  async function cancelOrder() {
    try {
      setLoading(true)
      const orderRes = await fetch(`/api/order/${props.id}/cancel`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      });
      const orderData = await orderRes.json()
      console.log(orderData)
      if (orderRes.status === 200) {
        Router.push('/orders');
      } else {
        //  TODO show error in proper custom error component on right side
        alert(orderData.message)
        setLoading(false)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  async function updateAddress() {
    try {
      setLoading(true)
      const orderRes = await fetch(`/api/order/${props.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        },
        body: JSON.stringify({
          address: newAddress
        })
      });
      const orderData = await orderRes.json()
      console.log(orderData)
      if (orderRes.status === 200) {
        Router.push(`/orders/${props.id}`); //  lol, easier way to refresh hehe
        // TODO: later just update address in state and not the whole page refesh
      } else {
        //  TODO show error in proper custom error component on right side
        alert(orderData.message)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  return (
    <div>
      <Nav /> 
      <div>
      {
        loading ?
        <div>Loading...</div>
        :
        <div className="my-8 mx-8 md:mx-32 grid gap-5">
          <div className='bg-gray-200 px-12 py-8 leading-loose shadow hover:shadow-lg'>
            <h1 className='text-bold text-2xl'>Product Details</h1>
            
            {
              order.products.map((product, i) => (
                <div key={product._id} className='mt-4 flex justify-around'>
                  <div>
                    <p>Product: {i+1}</p>
                    <p>Name: {product.product.name}</p>
                  </div> 
                  <div>
                    <p>Price: {product.product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className='bg-gray-200 px-12 py-8 leading-loose shadow hover:shadow-lg'>
            <h1 className='text-bold text-2xl mb-4'>Order Details</h1>
            <p>Order:  {props.id}</p>
            {
              (order.status === 'cancelled' || order.status === 'failed') ? <p>Status: <span className='text-red-500'>{order.status}</span></p> : <p>Status: <span className='text-blue-500'>{order.status}</span></p> 
            }
            {
                  order.status === 'cancelled' ? ' ' : (<p>Payment State: 
                    {
                      order.isPaid === 'paid' ? <span className='text-green-500 pl-4'>Paid</span> : <span className='text-red-500 pl-5'>Not Paid</span>
                    }
                  </p>)
            }
            {/* <p>Status: <span className={order.status}>{order.status}</span></p> */}
            <p>Total Price: {order.price}</p>
            <p>Placed on: {order.createdAt}</p>
            <p>{order.address}</p>
          </div>
          
          {
            order.status === 'ongoing' ? (
              <div className="flex justify-center gap-10 mt-5">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={cancelOrder}>Cancel Order</button>
            </div>
            ) : null
          }

         <div className='bg-gray-200 px-12 py-8 leading-loose shadow hover:shadow-lg'>
            <h1 className='text-bold text-2xl mb-4'>Adress Details</h1>
            <p>Line 1: {address.line1}</p>
            {
              address.line2 !== '' ? <p>Line 2: {address.line2}</p> : null
            }
            <p>City/State: {address.city}, {address.state}</p>
            <p>Pin:{address.pincode}</p>
            <p>Phone Number: {address.phoneNumber}</p>
            <p>Alternative Phone Number: {address.alternativePhoneNumber}</p>
          </div >
          {
            order.status === 'ongoing' ? (
              <div className='flex justify-center gap-10 mt-5'>
              {/* update address, but there will be check on client side that order is not more than 12 hrs old to be updated */}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={updateAddress}>Update Address</button>
            </div>
              ) : null
          }
          
        </div>
      }
      </div>
    </div>
  )
}
