import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'
import { useBearer } from '../services/hooks'



  export default function Profile() {

    const [profile, setProfile] = useState([])
    const [address, setAddress] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(async() => {
      fetch('/api/user', {
        method: "Get",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProfile(data)
      })
      .catch(err => console.log(err))
      .finally( () => {
        setLoading(false)
      })

      fetch('/api/address', {
        method: "Get",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      })
      .then(res => res.json())
      .then(data => {
         
        // setAddress(data)
        console.log(data)
      })
      .catch(err => console.log(err))
      .finally( () => {
        setLoading(false)
      })
      
    }, [])

    return (
      <div>
          <Nav />
          {
            loading ? (
              <div>
                Loading...
              </div>
            ) : 
            (
              <div>

              <div className='mx-28 my-12 grid place-items-center'>
                {
                  <div className='leading-loose w-4/5 bg-gray-200 py-12 px-12'>
                  <h1>{profile.username}</h1>
                  {/* <p>{profile.userType}</p> */}

                  <p>{profile.email}</p>
                  </div>
                }
              </div>

{
  address.map(address => {
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
          </div>
  })
}
                
                

              </div>
              
            )
          }
      </div>
    )
  }


