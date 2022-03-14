import React, {useState, useEffect} from 'react'
import { useBearer } from '../services/hooks'

export default function Cart() {
  const [cart, setCart] = useState([])
  useEffect(async () => {
    console.log(await useBearer());
    fetch('/api/cart', {
      method: "GET",
      headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setCart(data)
    })
    .catch(err => console.error(err))
  }, []);

  return (
    
    <div>Cart</div>
  )
}
