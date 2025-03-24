import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../../../shared/config/pg_database";

class Product extends Model {
  public id!: number;
  public name!: string;
  public category!: "beauty" | "fashion" | "electronics" | "kitchen";
  public price!: number;
  public description!: string;
  public stock!: number;
  public brand?: string;
  public images!: string[];
  // public specifications?: object;
  public specifications?: object[];
  public discount?: number;
  public ratings?: number;
  public reviews?: object[];
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["beauty", "fashion", "electronics", "kitchen"]],
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    specifications: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    ratings: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 10,
      },
    },
    reviews: {
      type: DataTypes.ARRAY(DataTypes.JSONB), // Stores user reviews
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Product",
    timestamps: true,
  }
);

export default Product;
