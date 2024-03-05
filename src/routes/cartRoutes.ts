import { Router } from "express";
import { getAllCartItems, addItemToCart, updateQuantityInCart } from "../controllers/cartController";

const router = Router();

router.get("/", getAllCartItems);
router.post("/", addItemToCart)
router.patch("/", updateQuantityInCart)

export default router;
