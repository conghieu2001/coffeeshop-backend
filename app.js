const express = require("express");
const cors = require("cors");
const itemsRouter = require("./app/routes/item.route");
const adminsRouter = require("./app/routes/admin.route");
const postRouter = require("./app/routes/post.route");
const tuyendungRouter = require("./app/routes/tuyendung.route");
const storeRouter = require("./app/routes/store.route");
const userRouter = require("./app/routes/user.route");
const payRouter = require("./app/routes/pay.route");
const cmtRouter = require("./app/routes/cmt.route");
const promoRouter = require("./app/routes/promo.route");
const ApiError = require("./app/api-error");
const Login = require("./login");
const app = express();

// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3001'}))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/items", itemsRouter);
app.use("/admin", adminsRouter);
app.use("/posts", postRouter);
app.use("/tuyendung", tuyendungRouter);
app.use("/cuahang", storeRouter);
app.use("/user", userRouter);
app.use("/pay", payRouter);
app.use("/cmt", cmtRouter);
app.use("/promo", promoRouter);
app.use("/", Login);
// app.get("/", (req, res) => {
//     res.json({message: "Welcome to coffee shop applicaton"});
// });
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
    
    

module.exports = app;