import axios from "axios"
import * as cheerio from "cheerio"
import { extractCurrency, extractDescription, extractPrice } from "../utils"

export async function  scrapeAmazonProduct(url: string){
    if(!url) return
    
    const userName= String(process.env.Bright_Data_userName)
    const Password = String(process.env.Bright_Data_Password)
    const port =22225
    const Sessions_id =(1000000*Math.random())| 0

    const options:any={
        auth:{
            userName:`${userName}-sessions-${Sessions_id}`,
            Password,
        },
        host :'brd.superproxy.io',
        port,
        rejectUnauthorized:false
    }

    try{
     // fetch  the product information/ page
     const response = await axios.get(url, options)
     
    const $=  cheerio.load(response.data)
     // extract the product information
     const title = $('#productTitle').text().trim();
     const currentPrice = extractPrice(
        $('.priceToPay span.a-price-whole'),
        $('.a.size.base.a-color-price'),
        $('.a-button-selected .a-color-base'),
      );
      const originalPrice = extractPrice(
        $('#priceblock_ourprice'),
        $('.a-price.a-text-price span.a-offscreen'),
        $('#listPrice'),
        $('#priceblock_dealprice'),
        $('.a-size-base.a-color-price')
      );
     const outofStock = $ ('#availablility span').text().trim().toLowerCase()==='currently unavailable';
     const images =
     $('#imgBlkFront').attr('data-a-dynamic-image')||
     $('#landingImage').attr('data-a-dynamic-image')||
     '{}'
     const imageUrls = Object.keys(JSON.parse(images));

     const currency = extractCurrency($('.a-price-symbol'));
     const  discountRate= $('.savingsPercentage').text().replace(/[-%]/g, '');
     const rating = $('.a-icon-alt').eq(0).text().split(' ')[0];
     const category = $('#twotabsearchtextbox').val()?.split('+');
    const ratingCount = $('#acrCustomerReviewText').text().match(/\d{1,3}(,\d{3})*/)[0];
    const description = extractDescription($)
    

    
    
     
     

     const data = {
        url,
        currency:currency||"$",
        image:imageUrls,
        title,
        rating:Number(rating),
        ratingCount,
        category:category,
        currentPrice:Number(currentPrice) || 0,
        originalPrice:Number(originalPrice) ||  0,
        discountRate:Number(discountRate),
        priceHistory:[],
        isOutOFStock:outofStock,
        description:description,
        lowestPrice:Number(currentPrice) || Number(originalPrice) ,
        highestPrice:Number(originalPrice) || Number(currentPrice),
        avgPrice:Number(currentPrice) || Number(originalPrice),

        


     }
    
    return data;
    }catch(err:any){
    throw new Error(`Failed to scrape product: ${err.message}`);
    }
}