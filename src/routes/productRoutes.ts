import { Router } from "express";
import { addProduct, getAllProducts } from "../controllers/productController";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.get("/", getAllProducts);
router.post("/",upload.single("productImage"),  addProduct)

export default router;
