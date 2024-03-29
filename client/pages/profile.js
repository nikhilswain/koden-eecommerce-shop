import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'
import { useBearer } from '../services/hooks'
import UpdateAddressModal from '../components/updateAddressModal'
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';

export default function Profile() {

  const [profile, setProfile] = useState([])
  const [address, setAddress] = useState([{
    line1: '123',
    line2: '133',
    pincode: '123',
    city: '123',
    state: '123',
    phoneNumber: '123',
    alternatePhoneNumber: '132'
  }])
  const [newAddress, setNewAddress] = useState({})
  const [selectedAddress, setSelectedAddress] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [avatar, setAvatar] = useState('')

  useEffect(async() => {
    try {
      const profileRef = await fetch('/api/user', {
        method: "Get",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      });
      const profile = await profileRef.json();
      setProfile(profile)
      const addressRes = await fetch('/api/address', {
        method: "Get",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      })
      const addressData = await addressRes.json()
      setAddress(addressData.addresses);
      let svg = createAvatar(style, {
        seed: profile.username,
        dataUri: true,
      });
      setAvatar(svg);
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }, [])



  async function deleteAddress(id) {
    if (confirm('Are you sure you want to delete this address?') === false)
      return;
    try {
      const res = await fetch(`/api/address/${id}`, {
        method: "Delete",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        }
      })
      const data = await res.json()
      if (res.ok === true) {
        // window.location.reload();
        //  remove address from state
        const newAddress = address.filter(address => address._id !== id)
        setAddress(newAddress)
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error);
      console.log(error)
    }
  }

  async function createNewAddress() {
    if (newAddress.line1 === undefined || newAddress.line2 === undefined || newAddress.state === undefined || newAddress.city === undefined || newAddress.pincode === undefined || newAddress.phoneNumber === undefined || newAddress.alternativePhoneNumber === undefined) {
      alert('Please fill out all fields')
      return;
    }
    try {
      const res = await fetch('/api/address', {
        method: "Post",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        },
        body: JSON.stringify(newAddress)
      })
      const data = await res.json()
      if (res.ok === true) {
        // window.location.reload();
        //  add address to state
        const newAddress = [...address, data.address]
        setAddress(newAddress)
        setNewAddress({})
        console.log(address);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  function openUpdateModal(addressObj) {
    setSelectedAddress(addressObj)
    // open a modal and pass in the address object
    setIsOpen(true)
  }

  function closeUpdateModal() {
    setIsOpen(false)
  }

  return (
    <div>
        <Nav />
        { isOpen === true ? <UpdateAddressModal address={selectedAddress} closeCallback={closeUpdateModal} /> : null }
        {
          loading ? (
            <div>
              Loading...
            </div>
          ) : 
          (
            <div className='mx-28 my-12 grid gap-5 place-items-center'>

              <div className="w-4/5" >
                {
                  <div className='leading-loose  bg-gray-200 py-12 px-12'>
                    <h1 className='text-2xl mb-4'>Profile</h1>
                    <div className='flex justify-between'>
                      <div>
                        <h1>{profile.username}</h1>
                        <p>{profile.email}</p>
                      </div>
                      <div className='inline-block bg-gray-500 rounded-full w-24 h-24 relative'>
                        <img className='absolute w-24 h-24'  src={avatar} />
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className=' w-4/5 bg-gray-200 px-12 py-8 leading-loose shadow hover:shadow-lg'>
                <h1 className='text-bold text-2xl mb-4'>Shipping Addresses</h1>
                <div className='grid gap-4'>
                  {
                    address?.length > 0 ?
                    address.map(address => (
                      <div className='p-4 bg-gray-100 relative' id={address._id} key={address._id}>
                        <div className='absolute top-3 right-4 space-x-3'>
                          <button className='text-red-500 focus:border-none' onClick={() => deleteAddress(address._id)}>Delete</button>
                          <button className='text-blue-500' onClick={() => openUpdateModal(address)}>Update</button>
                        </div>
                        <p>Line 1: {address.line1}</p>
                        { address.line2 !== undefined ? <p>Line 2: {address.line2}</p> : null }
                        <p>City/State: {address.city}, {address.state}</p>
                        <p>Pin: {address.pincode}</p>
                        <p>Phone Number: {address.phoneNumber}</p>
                        { address.alternativePhoneNumber !== undefined ? <p>Alternative Phone Number: {address.alternativePhoneNumber}</p> : null }
                      </div>
                    )) : (
                      <div>
                        <p className='text-center text-2xl mt-4'>No Address Found</p> 
                      </div>
                    )
                  }
                   <details>
                                <summary className='list-none w-fit py-1 px-2 bg-pink-500 rounded-md text-white cursor-pointer' >Add New Address</summary>
                             
                              <div className="leading-relax flex flex-col justify-center p-3 gap-5">
                                <div className="flex gap-6">
                                  <label htmlFor="line1">Line 1:</label>
                                  <input className='border border-black px-4' defaultValue={newAddress.line1} onChange={e => {newAddress.line1 = e.target.value}} type="text" name="line1" id="line1" placeholder='state,district,locality'/>
                                </div>
                                <div className="flex gap-6">
                                  <label htmlFor="line2">Line 2:</label>
                                  <input onChange={e => {newAddress.line2 = e.target.value}} defaultValue={newAddress.line2} className='border border-black px-4 ' type="text" name="line1" id="line2" placeholder='Near by area, landmark (optional)'/>
                                </div>
                                <div className="flex gap-6">
                                  <label htmlFor="city">City:</label>
                                  <input onChange={e => (newAddress.city = e.target.value)}  className='border border-black px-4 ' type="text" name="city" id="city" placeholder='city'/>
                                </div>
                                <div className="flex gap-6">
                                  <label htmlFor="state">State:</label>
                                  <input onChange={e => (newAddress.state = e.target.value)}  className='border border-black px-4 ' type="text" name="state" id="state" placeholder='state'/>
                                </div>
                                <div className="flex gap-6">
                                    <label htmlFor="pincode">Pincode:</label>
                                    <input onChange={e => (newAddress.pincode = e.target.value)}  className='border border-black px-4 '  type="text" name="pincode" id="pincode" placeholder='pincode'/>
                                </div>
                                <div className="flex gap-6">
                                    <label htmlFor="phone">Phone:</label>
                                    <input onChange={e => (newAddress.phoneNumber = e.target.value)}  className='border border-black px-4 ' type="number" name="phone" id="phone" placeholder='phone'/>
                                </div>
                                <div className="flex gap-6">
                                    <label htmlFor="altphone">Alternative Phone Number</label>
                                    <input onChange={e => (newAddress.alternativePhoneNumber = e.target.value)}  className='border border-black px-4 ' type="number" name="altphone" id="altphone" placeholder='phone'/>
                                </div>
                              </div>
                                <button onClick={createNewAddress} className='bg-blue-500 hover:shadow-xl text-white px-4 py-2 mt-3 rounded-lg'>Add Address</button>
                              </details>
                </div>
              </div>
            </div>
            
          )
        }
    </div>
  )
}


