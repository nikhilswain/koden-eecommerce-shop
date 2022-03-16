import React, { useState, useEffect } from 'react'
import { useBearer } from '../services/hooks'

/*
* 'type' prop can be 'checkout' or 'cart'.
* 'addresses' is list of addresses of the user
* 'selectedAddress' is the address that the user will selected from the dropdown for checkout
*/

export default function ({ product, cart, type }) {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);

  useEffect(async () => {
    fetch('/api/address', {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": await useBearer()
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAddresses(data.addresses);
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function checkoutCart() {
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
      console.log(data);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
  }

  async function checkoutProduct() {
    try {
      const res = await fetch(`/api/product/${product.productId}/checkout`, {
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
      console.log(data);

      }
     catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    // make it fixed & center
    <div className='fixed '>
        <h1>Checkout</h1>
        <div>
          <h2>Addresses</h2>
          {/* make it as dropdown input, i.e. user can select one of the addressees; selected address will go in 'selectedAddress' state */}
          {addresses.map(address => (
            <div key={address.id}>
              <h3>{address.line1}</h3>
              <p>{address.pincode}</p>
            </div>
          ))}
        </div>
        <div>
            {
              type === 'cart' ?
                <>
                  {/* can show stuff like total price etc, take data from  */}
                  {JSON.stringify(cart)}
                  <button onClick={checkoutCart()}>Checkout Cart</button>
                </>
              :
                <>
                  {/* can show more details about product, i.e. take data from parent component thru prop 'product' object. */}
                  {JSON.stringify(product)}
                  <button onClick={checkoutProduct()}>Buy Now</button>
                </>
            }

        </div>
    </div>
  )
}
