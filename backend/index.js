const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();



app.use(express.json());
app.use(cors());

//const connectDB = async ()=>{//get thye data from db----------------
//    mongoose.connect('mongodb://localhost:27017/shop');
//    const mobilesSchema = new mongoose.Schema({});
//    const mobiles = mongoose.model('mobiles',mobilesSchema);
//    const data = await mobiles.find();
//    console.log(data);

// }
// connectDB();


app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result);

})


app.post("/login", async (req, res) => {
    //res.send(req.body);
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");

        if (user) {
            res.send(user)
        } else {
            res.send({ result: 'No User Found' })
        }
    } else {
        res.send({ result: 'No UserFound' })
    }
})


app.post("/add-product", async (req,res)=>{
    let product  = new Product(req.body);
    let result =await product.save();
    res.send(result)

})


app.listen(7000, () => {
    console.log("listening the port 7000");
});