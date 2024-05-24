import mongoose from "mongoose";

const productSchema =  new mongoose.Schema({
    url:{type:String, required:true,unique:true},
    currency:{type:String, required:true},
    image:{type:[String], required:true},
    title:{type:String, required:true},
    category:{type:[String]},
    currentPrice:{type:Number, required:true},
    originalPrice:{type:Number, required:true},
    priceHistory:[
        {
            price:{type:String, required:true},
            date:{type:Date, default:Date.now}
        },

    ],
    lowestPrice:{type:Number},
    highestPrice:{type:Number},
    avgPrice:{type:Number},
    discountRate:{type:Number},
    ratingCount:{type:String},
    rating:{type:Number},
    isOutOFStock:{type:Boolean, default:false},
    users:[
        {email:{type:String, required:true},}
       
    ], default:[]




},{timestamps:true},)

const Product:any=  mongoose.model('Product', productSchema)
export default Product

