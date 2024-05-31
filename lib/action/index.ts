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
   console.log(product)
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

export async function getProductById(productId:string){
    try {
       connecttoDB();
       const product = await Product.findOne({_id: productId})
       if(!product) return null;
       return product;

    } catch (error) {
        console.log(error)
    }
}


export  async function getAllProducts(){
    try {
        connecttoDB()
        const products:any = await Product.find();
    return products
    } catch (error) {
        console.log(error)
    }
}
export  async function getSimilarProducts(productId:string){
    try {
        connecttoDB()
        const currentProduct = await Product.findById(productId);
        if(!currentProduct) return null;
        const similarProducts= await  Product.find({
            _id:{$ne:productId}
        }).limit(4)
    return similarProducts
    } catch (error) {
        console.log(error)
    }
}

