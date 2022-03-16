import React, { useEffect, useState } from 'react'
import { useBearer } from '../../services/hooks'

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
    console.log(data);
    setOrders(data);
    setLoading(false);
  }, []);

  if (loading === true) {
    return (
      <div>
        <h1>Orders</h1>
        <p>Loading...</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1 className='text-center p-4'>Orders</h1>
        <div className='m-3 mt-10 grid grid-cols-3 gap-5'>
          {
            orders.length > 0 ?
            orders.map((order, i) => (
              <div className='border-2 border-y-black p-3' key={i}>
                <h1>{order._id}</h1>
                <h1>{order.createdAt}</h1>
                <h2>{order.status}</h2>
                <p>{order.isPaid}</p>
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
