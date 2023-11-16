require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routeAPIUser = require("./routes/api/user");
const routeWebUser = require("./routes/web/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const configViewEngine = require("./config/viewEngine");
const connection = require("./config/connectDB");
const session = require("express-session");
const flash = require("express-flash");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
configViewEngine(app);

app.use(express.static(__dirname + "/public"));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

connection();

app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  let carts = req.session.cart;
  let total = 0;
  let sum = 0;
  for (let i = 0; i < carts.length; i++) {
    sum = carts[i].price * carts[i].quantity;
    total += sum;
  }
  res.locals.cart = req.session.cart;
  res.locals.total_cart = total;
  next();
});

app.use((req, res, next) => {
  if (!req.cookies.UserId) {
    res.locals.UserId = "";
  }
  res.locals.UserId = req.cookies.UserId;
  next();
});

app.use("/api/v1", routeAPIUser);
app.use("/", routeWebUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
