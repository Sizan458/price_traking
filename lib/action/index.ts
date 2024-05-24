"use server"

import { revalidatePath } from "next/cache";
import { connecttoDB } from "../mongose";
import { scrapeAmazonProduct } from "../scraper";
import Product from "../model/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";


export async function  scraprAndStoreProduct(productUrl: string){
    if(!productUrl) return;
    try{
       connecttoDB()
  const scrapedProduct:any = await scrapeAmazonProduct(productUrl);
  if(!productUrl) return;

   let product = scrapedProduct
   const existingProduct = await  Product.findOne({url:scrapedProduct.url});
   if(existingProduct){
    const updatePriceHistory=[
        ...existingProduct.priceHistory,
        {price:scrapedProduct.currentPrice}
    ]

    product={
        ...scrapedProduct,
        priceHistory:updatePriceHistory,
        lowestPrice:getLowestPrice(updatePriceHistory),
        highestPrice:getHighestPrice(updatePriceHistory),
        avgPrice:getAveragePrice(updatePriceHistory),

    }
   }
    const newProduct= await Product.findOneAndUpdate(
        {url:scrapedProduct.url},
        product,
        {upsert:true, new:true}
    )
    revalidatePath(`/products/${newProduct._id}`)
    }catch(error:any){
        throw new  Error(`Failed to retrieve/cerate product:${error.message} `)
    }
}