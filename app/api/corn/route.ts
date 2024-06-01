import Product from "@/lib/model/product.model"
import { connecttoDB } from "@/lib/mongose"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";
export const maxDuration= 60;
export const  dynamic = 'force-dynamic';
export const  revalidate= 0;

export async  function GET(request: Request){
    try {
        connecttoDB()
        const product = await Product.find({});
        if(!product) throw new Error("Product not found");
        //1 .scrape latest product details  & update db
        const updateProduct = await  Promise.all(
            product.map(async (CurrentProduct) => {
            const scrapeProduct = await scrapeAmazonProduct(CurrentProduct.url)
            if(!scrapeProduct) throw new Error(' No product found')
                const updatedPriceHistory = [
                    ...CurrentProduct.priceHistory,
                    {
                      price: scrapeProduct.currentPrice,
                    },
                  ];
          
                  const product = {
                    ...scrapeProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    avgPrice: getAveragePrice(updatedPriceHistory),
                  };
          
                  // Update Products in DB
                  const updatedProducts = await Product.findOneAndUpdate(
                    {
                      url: product.url,
                    },
                    product
                  );

                  // 2  check each products status and send email 
                  const emailNotifType=  getEmailNotifType(scrapeProduct, CurrentProduct) 
                  if(emailNotifType && updatedProducts.users.length > 0){
                    const productInfo={
                        title:updatedProducts.title,
                        url:updatedProducts.url,


                    }

                    const emailContent= await generateEmailBody(productInfo,emailNotifType);
                    const userEmails= updatedProducts.users.map((user:any)=>user.email)
                    await sendEmail(emailContent,userEmails)
                  }
                  return updatedProducts
            })


        )
        return NextResponse.json({
            message:'ok',data:updateProduct
        })
    } catch (error) {
        throw new Error(`Error in Get:, ${error}`)
    }
}