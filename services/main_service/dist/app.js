"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const users_1 = require("./modules/users");
const order_1 = require("./modules/order");
const payments_1 = require("./modules/payments");
const product_1 = require("./modules/product");
const product_2 = require("./modules/product");
const reviews_1 = require("./modules/reviews");
const GlobalErrorHandler_1 = __importDefault(require("./shared/middleware/GlobalErrorHandler"));
const app = (0, express_1.default)();
app.post("/api/payment/card/webhook", body_parser_1.default.raw({ type: "application/json" }), (req, res, next) => {
    req.rawBody = req.body.toString("utf8");
    next();
}, (req, res, next) => {
    req.skipBodyParsing = true;
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.use(bodyParser.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const allowedOrigins = [
    "http://localhost:3000",
    "https://api.publicapis.org/entries",
    "http://localhost:3001",
    "http://localhost:8000",
    "https://e-commerce-e-commerce-brown.vercel.app",
    "https://shop.kivamall.com",
    "https://www.kivamall.com",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log("Blocked CORS request from origin:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // This allows cookies to be sent and received if needed
};
app.use((0, cors_1.default)(corsOptions));
app.use((req, res, next) => {
    console.log("Testing middleware");
    next();
});
// // Create PostgreSQL connection pool
// const pgPool = new Pool({
//   connectionString: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/omnibussines",
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
// });
// app.use(
//   session({
//     store: new pgSession({
//       pool: pgPool,
//       tableName: 'user_sessions', // Will be created automatically
//       pruneSessionInterval: 60 * 60 // Clean up expired sessions hourly
//     }),
//     secret: process.env.SESSION_SECRET || "secret",
//     resave: false,
//     saveUninitialized: false, // Changed to false for GDPR compliance
//     cookie: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Only true in production
//       sameSite: 'lax', // Recommended for CSRF protection
//       maxAge: 8 * 60 * 60 * 1000, // 8 hours
//       // Remove 'expires' as 'maxAge' is sufficient
//     }
//   })
// );
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       secure: true,
//       expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
//       maxAge: 8 * 60 * 60 * 1000,
//     },
//   })
// );
// Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());
app.get("/", (_req, res) => res.sendStatus(200));
app.get("/health", (_req, res) => res.sendStatus(200));
app.use("/api/auth", users_1.authRouter);
app.use("/api/user", users_1.userRouter);
app.use("/api/product", product_1.productRouter);
app.use("/api/category", product_2.categoryRouter);
app.use("/api/order", order_1.orderRouter);
app.use("/api/review", reviews_1.reviewRouter);
// app.use("/api/payment", payments);
app.use("/api/payments", payments_1.paystackPayments);
app.use(GlobalErrorHandler_1.default);
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ error: err.message });
// });
app.use((req, res, next) => {
    res
        .status(400)
        .json({ msg: `Cannot find that route ${req.originalUrl} on this server` });
    next();
});
// app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500;
//   res.status(statusCode).json({
//     status: "error",
//     message: err.isOperational ? err.message : "Internal Server Error",
//   });
// });
exports.default = app;
