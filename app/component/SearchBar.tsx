'use client'

import { scraprAndStoreProduct } from "@/lib/action";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const SearchBar = () => {
  const [Search, setSearch]= useState('')
  const [loading, setLoading]= useState(false)
  const isValiedAmazonUrl=(url:string) =>{
 try{
  const parseUrl= new URL(url);
  const hostName=parseUrl.hostname
 if( hostName.includes('amazon.com') || 
 hostName.includes ('amazon.') || 
 hostName.endsWith('amazon')){
  return true;
 }
 }catch(error){
  return false
 }
 
  }
    const handleSubmit = async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const  isValidLink=isValiedAmazonUrl(Search)
       if(!isValidLink) return  Swal.fire({
        title: "Please enter a valid Amazon URL",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
  try{
   setLoading(true)
   // scraping the product page
   const product=  await scraprAndStoreProduct(Search)
  }catch(error){
   console.log(error)
  }finally{
    setLoading(false)
  }
       

    }
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
    <input type="text"  value={Search} onChange={(e)=>setSearch(e.target.value)} placeholder="Inter Your Product Link Here" className="searchbar-input"/>
    <button  type="submit" className="searchbar-btn" disabled={Search=== ""}>
     {loading ? 'Searching...': 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
