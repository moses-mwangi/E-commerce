"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_database_1 = __importDefault(require("../../../../shared/config/pg_database"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subCategory: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    status: {
        type: sequelize_1.DataTypes.ENUM("in stock", "out of stock"),
        allowNull: false,
        defaultValue: "in stock",
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    dealPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    sold: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    costPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    trending: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    trendingScore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 50,
        validate: {
            min: 50,
            max: 100,
        },
    },
    images: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: true,
    },
    specifications: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
        allowNull: true,
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    averageRating: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    ratings: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 10,
        },
    },
    reviews: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
        allowNull: true,
    },
}, {
    sequelize: pg_database_1.default,
    tableName: "products",
    modelName: "Product",
    timestamps: true,
});
exports.default = Product;
