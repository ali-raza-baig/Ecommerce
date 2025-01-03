import slugify from "slugify";
import fs from "fs"
import ProductModel from "../Models/ProductModel.js";

// Create product 
export const createproductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files

        if (!name || !description || !price || !category || !quantity || !photo) {
            return res.status(500).send({ error: "All Fields are Required" });
        }
        const products = await ProductModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully.",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Server Error"
        })
    }
}


// getallproduct 

export const getallproducts = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "All Products",
            countTotal: products.length,
            products
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Getting Products.",
            error
        })
    }

}

// getsingleproducts 

export const getsingleproducts = async (req, res) => {
    try {
        const products = await ProductModel.findOne({ slug: req.params.slug }).populate("category").select("-photo")
        res.status(201).send({
            success: true,
            message: "Single Product",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in gatting single product",
            error
        })
    }
}

// getproductphoto 

export const getproductphoto = async (req, res) => {
    try {
        const products = await ProductModel.findById(req.params.pid).select("photo")
        if (products.photo.data) {
            res.set("content-type", products.photo.contentType)
            return res.status(200).send(products.photo.data);
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error
        })
    }
}


// Delete product 
export const deleteproduct = async (req, res) => {
    try {
        const products = await ProductModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product Delete Successfuly"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Deletting product",
            error
        })
    }

}

// Update Product 
export const updateproduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name || !description || !price || !category || !quantity || !photo:
                return res.status(500).send({ error: "All Fields are Required" });
        }
        const products = await ProductModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Update Successfuly.",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating Product"
        })
    }
}


// filterproductcontroler 
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
};

// search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await ProductModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};