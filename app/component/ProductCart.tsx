import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface Props{
    product:Product
}

const ProductCart = ({product}:Props) => {
  return (
    <Link href={`/products/${product._id}`} className='product-card'>
        <div>
           <Image src={product.image[0] } alt={product.title} width={200} height={200} className='product-card_img'/> 
        </div>
        <div className=' flex flex-col gap-2'>
        <h3 className='product-title'>{product.title}</h3>
        <div className='flex justify-between'>
          <p className='text-black opacity-50 text-lg capitalize'>{product.category}</p>
          <p className='text-black text-lg font-semibold'>
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
        </div>
    </Link>
  )
}

export default ProductCart
