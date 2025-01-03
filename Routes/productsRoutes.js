import express from "express";
import formidable from "express-formidable";
import { requireSingin, isadmin } from "../Middelwear/AuthMiddelwear.js"
import {
    createproductController, deleteproduct, getallproducts,
    getproductphoto, getsingleproducts,
    productFiltersController,
    searchProductController,
    updateproduct
} from "../Controlers/ProductController.js";
const routes = express.Router()

// Create Product 
routes.post("/create-products", requireSingin, isadmin, formidable(), createproductController);

// Get all products 
routes.get("/all-products", getallproducts);


// get one product 
routes.get("/single-products/:slug", getsingleproducts);


// Get photo 
routes.get("/product-photo/:pid", getproductphoto);

//  Delete Product 
routes.delete("/delete-product/:pid", requireSingin, isadmin, deleteproduct);

// Update Product 
routes.put("/update-product/:pid", requireSingin, isadmin, formidable(), updateproduct);


// Filter Products 
routes.post("/filter-product", productFiltersController)

// Search 
routes.get("/search", searchProductController)

export default routes;