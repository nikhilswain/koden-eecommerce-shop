import React, { useEffect, useRef } from 'react'
import { useBearer } from '../services/hooks'

export default function UpdateAddressModal({ address, closeCallback }) {
  const modalRef = useRef();

  useEffect(() => {
    if (modalRef.current.hasAttribute('open') === false) {
      modalRef.current.showModal();
    }
  }, []);
  
  function closeModal() {
    modalRef.current.close();
    closeCallback();
  }

  async function updateAddress() {
    try {
      const addressRef = await fetch('/api/address/' + address._id, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "Authorization": await useBearer()
        },
        body: JSON.stringify(address)
      });
      const addressData = await addressRef.json();
      if (addressRef.status === 200) {
        alert('address updated successfully');
        closeModal();
      } else {
        throw new Error(addressData.message);
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <dialog className='relative w-2/3 border h-2/3' ref={modalRef}>
      <div onClick={closeModal} className='absolute text-3xl top-3 right-6 cursor-pointer text-red-500'>&times;</div>
      <div className="leading-relax flex flex-col justify-center p-3 gap-5">
        <div className="flex gap-6">
          <label htmlFor="line1">Line 1:</label>
          <input className='border border-black px-4' onChange={e => {address.line1 = e.target.value}} value={address.line1} type="text" name="line1" id="line1" placeholder='state,district,locality'/>
        </div>
        <div className="flex gap-6">
          <label htmlFor="line2">Line 2:</label>
          <input onChange={e => {address.line2 = e.target.value}} value={address.line2}  className='border border-black px-4 ' type="text" name="line1" id="line2" placeholder='Near by area, landmark (optional)'/>
        </div>
        <div className="flex gap-6">
          <label htmlFor="city">City:</label>
          <input onChange={e => (address.city = e.target.value)} value={address.city} className='border border-black px-4 ' type="text" name="city" id="city" placeholder='city'/>
        </div>
        <div className="flex gap-6">
          <label htmlFor="state">State:</label>
          <input onChange={e => (address.state = e.target.value)} value={address.state} className='border border-black px-4 ' type="text" name="state" id="state" placeholder='state'/>
        </div>
        <div className="flex gap-6">
            <label htmlFor="pincode">Pincode:</label>
            <input onChange={e => (address.pincode = e.target.value)} value={address.pincode} className='border border-black px-4 '  type="text" name="pincode" id="pincode" placeholder='pincode'/>
        </div>
        <div className="flex gap-6">
            <label htmlFor="phone">Phone:</label>
            <input onChange={e => (address.phoneNumber = e.target.value)} value={address.phoneNumber} className='border border-black px-4 ' type="number" name="phone" id="phone" placeholder='phone'/>
        </div>
        <div className="flex gap-6">
            <label htmlFor="altphone">Alternative Phone Number</label>
            <input onChange={e => (address.alternativePhoneNumber = e.target.value)} value={address.alternativePhoneNumber} className='border border-black px-4 ' type="number" name="altphone" id="altphone" placeholder='phone'/>
        </div>
      </div>
      <button onClick={updateAddress} className='bg-blue-500 hover:shadow-xl text-white px-4 py-2 mt-3 rounded-lg'>update</button>
    </dialog>
  )
}
