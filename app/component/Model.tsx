'use client';
import { addUserEmailToProduct } from '@/lib/action';
import Image from 'next/image';
import React, { FC, FormEvent, useState } from 'react';
interface Props{
  productId:string
}

const ModalWithCheckbox: FC = ({productId}:Props) => {
  const [isSubmitting , setIsSubmitting]=useState(false);
const [email, setEmail] = useState('')
const handelSubmit = async(e:FormEvent<HTMLFormElement>)=>{
e.preventDefault();
setIsSubmitting(true)
await   addUserEmailToProduct(productId ,email)

// add user email to update 
setIsSubmitting(false)
setEmail('')
}
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6" className="btn">Track</label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg"> 
          <Image src='/assets/icons/logo.svg' alt='logo' width={28} height={28}/>
          </h3>
          <h4 className='dialog-head_text '>Stay update product pricing alerts with right in your inbox !</h4>
          <p className='text-sm text-gray-600 mt-2'>Never miss right product price</p>
           <form className='flex flex-col mt-5 ' onSubmit={handelSubmit}>
           <label htmlFor="email" className='text-sm  font-medium  text-gray-700'>
       Email address
           </label>
          <div className='dialog-input_container'>
            <Image src='/assets/icons/mail.svg' alt='mail' width={18} height={18} />
            <input type="email" required  id='email' placeholder='Enter your email address'  value={email}  onChange={(e)=>setEmail(e.target.value)}          className='dialog-input' />
          </div>
          <button type='submit' className='dialog-btn'>{isSubmitting ? "Submitting...":'Track'}</button>
           </form>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">Close!</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWithCheckbox;
