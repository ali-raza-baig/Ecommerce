import express from "express";
import { isadmin, requireSingin } from "../Middelwear/AuthMiddelwear.js";
import {
    CreateCategoryControler, UpdateCategoryController,
    allcategory, deletecategory, onecategory
} from "../Controlers/CategoryControler.js";

const routes = express.Router()

// Create New Category 

routes.post("/create-category", requireSingin, isadmin, CreateCategoryControler)

// Update Category 
routes.put("/update-category/:id", requireSingin, isadmin, UpdateCategoryController)

// get all category 
routes.get("/all-categories", allcategory)

// get one category 
routes.get("/one-category/:slug", onecategory)


// Delete Category 
routes.delete("/delete-category/:id", requireSingin, isadmin, deletecategory)

export default routes;