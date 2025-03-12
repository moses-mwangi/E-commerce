"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.protect = exports.protectJwtUser = exports.loginUser = exports.signInUser = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const catchSync_1 = __importDefault(require("../../../shared/utils/catchSync"));
const userMode_1 = __importDefault(require("../models/userMode"));
const jwt_1 = require("../utils/jwt");
exports.signInUser = (0, catchSync_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password, tradeRole, telephone, country } = req.body;
    const existingUser = await userMode_1.default.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }
    const newUser = await userMode_1.default.create({
        email,
        passwordHash: password,
        name,
        tradeRole,
        telephone,
        country,
    });
    const token = (0, jwt_1.generateToken)({ id: newUser.id, email: newUser.email });
    const cookieOption = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        // httpOnly: true,
    };
    res.cookie("jwt", token, cookieOption);
    req.session.userId = newUser.id;
    res.status(200).json({
        msg: "Token has being succesfully created",
        token,
        session: req.session.userId,
    });
    req.user = newUser;
});
exports.loginUser = (0, catchSync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(202)
            .json({ msg: "Please provide an email and password to log in" });
    }
    const user = await userMode_1.default.findOne({
        where: {
            email: email,
        },
    });
    if (!user || !(await user?.comparePassword(password))) {
        return res.json({
            error: "No user with those credential has being found",
        });
    }
    const token = (0, jwt_1.generateToken)({ id: user.id, email: user.email });
    const cookieOption = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        // expires: new Date(Date.now() + 2 * 60 * 1000),
        // httpOnly: true,
    };
    res.cookie("jwt", token, cookieOption);
    res.status(200).json({ msg: "User succesfully LogIn", token });
    req.user = user;
});
const jwtVerify = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
};
exports.protectJwtUser = (0, catchSync_1.default)(async function (req, res, next) {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        res
            .status(401)
            .json({ msg: "You are not logged in! Please log in to get access." });
    }
    const decoded = await jwtVerify(token, String(process.env.JWT_SECRET_KEY));
    // const currentUser = await User.findById(decoded.id);
    const currentUser = await userMode_1.default.findOne({ where: { id: decoded.id } });
    if (!currentUser) {
        res
            .status(401)
            .json({ msg: "The user belonging to this token no longer exists." });
    }
    req.user = currentUser;
    next();
});
exports.protect = (0, catchSync_1.default)(async function (req, res, next) {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    else if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res
            .status(401)
            .json({ msg: "You are not logged in! Please log in to get access." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET_KEY));
        const currentUser = await userMode_1.default.findOne({ where: { id: decoded.id } });
        if (!currentUser) {
            return res
                .status(401)
                .json({ msg: "The user belonging to this token no longer exists." });
        }
        req.user = currentUser;
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            return res
                .status(401)
                .json({ msg: "Your session has expired. Please log in again." });
        }
        else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res
                .status(401)
                .json({ msg: "Invalid token. Please log in again." });
        }
        else {
            console.error("JWT Verification Error:", err);
            return res
                .status(500)
                .json({ msg: "An unexpected error occurred. Please try again later." });
        }
    }
});
const getMe = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ status: "success", user });
    }
    catch (err) {
        res.status(400).json({ status: "Fail", err });
        console.log(err);
    }
};
exports.getMe = getMe;
