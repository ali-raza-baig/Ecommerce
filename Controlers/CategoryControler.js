import CategoryModel from "../Models/CategoryModel.js";
import slugify from "slugify";

// Create Category Controler
export const CreateCategoryControler = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.send({
                success: false,
                message: "All Fields Are required."
            })
        }

        const Existing = await CategoryModel.findOne({ name })
        if (Existing) {
            res.status(200).send({
                success: false,
                message: "Category Allready Exist."
            })
        }

        const category = await new CategoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "Category added Successfully.",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Create Category"
        })
    }


}

// Update Category 
export const UpdateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params

        const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(201).send({
            success: true,
            message: "Update Successfully.",
            category
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Updating"
        })
    }
}


// get all category
export const allcategory = async (req, res) => {
    try {
        const category = await CategoryModel.find({})
        res.status(201).send({
            success: true,
            message: "All Categories",
            category
        })

    } catch (error) {
        console.log(error)
        res.send(500).send({
            success: false,
            message: "Error in get all category."
        })
    }

}

// Get one category 
export const onecategory = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug })
        res.status(201).send({
            success: true,
            message: "Required Category",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In getting category"
        })
    }

}

// Delete Category 
export const deletecategory = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryModel.findByIdAndDelete(id)
        res.status(201).send({
            success: true,
            message: "Category Deleted."
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Deleting Category"
        })
    }

}