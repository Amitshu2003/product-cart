import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import productRouter from './routes/productRoutes'
import cartRouter from './routes/cartRoutes'

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected with Database Successfully!!!"))
  .catch((err) => {
    console.log(`error while connecting with DB : ${err}`);
  });

app.use('/products', productRouter)
app.use('/cart', cartRouter)


app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
