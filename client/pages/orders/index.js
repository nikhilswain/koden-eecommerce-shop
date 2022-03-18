import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBearer } from '../../services/hooks';
import Nav from '../../components/nav';
import date from 'date-and-time';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await fetch('/api/order/?p=true', {
      method: "GET",
      headers: { 
        "content-type": "application/json",
        "Authorization": await useBearer()
      }
    })
    const data = await res.json();
    data.map(order => {
      const newDate = new Date(order.createdAt);
      const form = date.format(newDate, 'DD MMM YYYY');
      order.createdAt = form;
    })
    setOrders(data);
    setLoading(false);
  }, []);

  function createMarkup() {
    return {
      __html: '<svg xmlns="http://www.w3.org/2000/svg" width="30" fill="#4b5563" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 24 24"><path d="M8.818,15.889l7.071,-7.071c0.195,-0.195 0.195,-0.512 0,-0.707c-0.195,-0.195 -0.512,-0.195 -0.707,-0l-7.071,7.071c-0.195,0.195 -0.195,0.512 -0,0.707c0.195,0.195 0.512,0.195 0.707,0Z"/><path d="M15.889,15.182l-7.071,-7.071c-0.195,-0.195 -0.512,-0.195 -0.707,-0c-0.195,0.195 -0.195,0.512 -0,0.707l7.071,7.071c0.195,0.195 0.512,0.195 0.707,0c0.195,-0.195 0.195,-0.512 0,-0.707Z"/></svg>'
    }
 }

  if (loading === true) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <Nav />
        <h1 className='text-center p-4 text-bolder text-2xl'>Orders</h1>
        <div className='mx-2 mt-10 grid grid-cols-2 grid-flow-row auto-rows-max gap-2'>
          {
            orders.length > 0 ?
            orders.map((order, i) => (
              <div className='border-rounded shadow hover:shadow-lg p-3 leading-loose bg-gray-300' key={i}>
                <h1 className="truncate text-xl text-bold text-blue-600"><span className="text-black">Order Id:</span><Link href={`/orders/${order._id}`}><a className='pl-4'>{order._id}</a></Link></h1>
                <p className='flex justify-between'>
                <p >Product(s) : <span className='pl-2 w-1/2 truncate text-left'>{(order.products.map(product => product.product.name)).join(', ')}</span></p>
                {
                  order.products.map((product => product.product)).length > 1 ? <span className='text-gray-600 flex mr-16'><span dangerouslySetInnerHTML={createMarkup()}></span> {(order.products.map(product => product.product)).length} </span> : null
                }
                  </p>
                
                
                
                <p>Order Placed On: <span>{order.createdAt}</span></p>
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
                
              </div>
            ))
            :
            <p>No orders placed yet!</p>
          }
        </div>
      </div>
    )
  }
}
