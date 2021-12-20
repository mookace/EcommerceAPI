const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const upload = require("./routes/upload");

dotenv.config();

mongoose.connect('mongodb://localhost/EcommerceAPI',
    { useNewurlparser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database connected');
    }).catch(err => {
        console.log(err);
    })


app.use("/api/products", upload.single("img"), productRoute);

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("connected to port 5000");
})