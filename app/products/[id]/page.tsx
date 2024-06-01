import Model from '@/app/component/Model'
import PriceInfoCard from '@/app/component/PriceInfoCard'
import ProductCart from '@/app/component/ProductCart'
import { getProductById, getSimilarProducts } from '@/lib/action'
import { formatNumber } from '@/lib/utils'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
type Props={
  params:{id:string}
}

const ProductDetails =  async({params:{id}}:Props) => {
  const  product:Product = await getProductById(id);
  if(!product) redirect('/')
    const similarProduct = await  getSimilarProducts(id)
  return (
    <div className='product-container'>
    <div className=' flex gap-28 flex-col xl:flex-row'>
      <div className='product-image'>
        <Image src={product.image[0]}  alt={product.title} width={580} height={400} className='mx-auto'/>
      </div>
      <div className=' flex-1 flex flex-col  '>
        <div className=' flex justify-between items-start gap-5 flex-wrap pb-6  '>
           <div className='flex  flex-cols gap-3'>
           <p className='text-[28px] text-secondary font-semibold'>{product.title}</p>
      
           </div>
           <Link href={product.url} target='_blank' className='text-base  text-black opacity-50 flex-col' >Visit Product</Link>   
           <div className=' flex  items-center gap-3'>
            <div className=' product-hearts'>
             <Image src='/assets/icons/red-heart.svg' alt='heart' width={20} height={20}/>
             <p className='text-base font-semibold text-[#D46F77]'>{product. ratingCount}</p>
            </div>
            <div className='p-2  bg-white-200 rounded-10'>
              <Image src='/assets/icons/bookmark.svg' alt='bookmark' width={20} height={20}/>
            </div>
            <div className='p-2  bg-white-200 rounded-10'>
              <Image src='/assets/icons/share.svg' alt='bookmark' width={20} height={20}/>
            </div>

           </div>
        </div>
        <div className='product-info'>
        <div className='flex flex-cols gap-2'>
          <p className=' text-[34px] font-bold text-secondary'>{product.currency}{formatNumber(product.currentPrice)}</p>
          <p className=' text-[21px]  text-black opacity-50 line-through'>{product.currency}{formatNumber(product.originalPrice)}</p>
        </div>
        <div className='flex flex-cols gap-4 '>
       <div className='flex gap-3'>
        <div className='product-star flex gap-1 items-center'>
          <Image src='/assets/icons/star.svg' alt='star' height={16} width={16} />
          
          <p className='text-sm text-primary-orange font-semibold'>{product.rating}</p>

        </div>
        <div className='product-reviews'>
          <Image src='/assets/icons/comment.svg' alt='comment' width={16} height={16}/>
          <p className='text-sm text-secondary font-semibold'>{product.ratingCount} review</p>
        </div>

       </div>

       
        </div>
      </div>
      <div className=' flex flex-col gap-5 flex-wrap '>
        <PriceInfoCard 
        title="Current Price"
        iconSrc='/assets/icons/price-tag.svg'
        value={`${product.currency} ${formatNumber(product.currentPrice)}`}
        borderColor='#b6dbff'
        />
        <PriceInfoCard 
        title="Average Price"
        iconSrc='/assets/icons/chart.svg'
        value={`${product.currency} ${formatNumber(product.avgPrice)}`}
        borderColor='#b6dbff'
        />
        <PriceInfoCard 
        title="Hight Price"
        iconSrc='/assets/icons/arrow-up.svg'
        value={`${product.currency} ${formatNumber(product.highestPrice)}`}
        borderColor='#FCCE'
        />
        <PriceInfoCard 
        title="Low Price"
        iconSrc='/assets/icons/arrow-down.svg'
        value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
        borderColor='#BEFFC5'
        />

       </div>
      < Model productId={id}/>

      </div>
      
    </div>
    <div className=' flex flex-cols gap-16 '>
  <div className='flex  flex-col gap-5'>
    <h3 className='text-2xl text-secondary font-semibold'>
      Product Description
    </h3>
    <div className=' flex flex-col gap-4'>
      {product?.description?.split('/n+')}
    </div>
  </div>
  
</div>
<button className='btn w-fit mx-auto flex items-center justify-center  gap-3 min-w-[200px]'>
    <Image src='/assets/icons/bag.svg' alt='check' width={22} height={22}/>
    <Link href='/' className='text-base text-white'>Buy Now </Link>
  </button>


    {similarProduct && similarProduct?.length>0 && (
   <div className='py-14   gap-2 w-full '>
<div>
<p className='section-text'>Similar Product</p>
</div>
<div >
<div className=' grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
  {similarProduct.map((product) =>(
    <ProductCart key={product._id} product={product}/>
  ))}
</div>
</div>
     
    
   </div>
    ) }
    </div>
  )
}

export default ProductDetails 
