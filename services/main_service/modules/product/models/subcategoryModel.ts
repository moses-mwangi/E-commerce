import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/config/pg_database";
import Category from "./categoryModel";

class Subcategory extends Model {
  public id!: number;
  public categoryId!: number;
  public name!: string;
  public longName?: string;
  public description?: string;
  public slug!: string;
  public itemCount!: number;
}

Subcategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    itemCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "subcategories",
    modelName: "Subcategory",
    timestamps: true,
  }
);

export default Subcategory;
