import express from "express";
import { LoginController, RegisterController } from "../Controlers/AuthController.js";
import { isadmin, requireSingin } from "../Middelwear/AuthMiddelwear.js";


const router = express.Router();

// test Routes 
router.get("/test", requireSingin, (req, res) => {
    res.send({
        message: "test routes"
    })
})

// Register Routes 
router.post("/register", RegisterController);

// Login Routes 
router.post("/login", LoginController)

// Protected Routes  for user
router.get("/user-auth", requireSingin, (req, res) => {
    res.status(200).send({ ok: true })
})
// Protected Routes for Admin 

router.get("/admin-auth", requireSingin, isadmin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router;