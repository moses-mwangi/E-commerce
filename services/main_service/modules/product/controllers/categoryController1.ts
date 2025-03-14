import { Request, Response } from "express";
import Category from "../models/categoryModel";
import Filter from "../models/categoryFilterModel";
import FilterOption from "../models/filterOption";
import Subcategory from "../models/subcategoryModel";

export const createCategories = async (req: Request, res: Response) => {
  try {
    const { categories } = req.body;

    for (const categoryData of categories) {
      const { filters, subcategories, ...categoryFields } = categoryData;

      const category = await Category.create(categoryFields);

      if (filters && filters.length > 0) {
        for (const filter of filters) {
          const filterInstance = await Filter.create({
            name: filter.name,
            categoryId: category.id,
          });

          if (filter.options && filter.options.length > 0) {
            for (const option of filter.options) {
              await FilterOption.create({
                filterId: filterInstance.id,
                option,
              });
            }
          }
        }
      }

      if (subcategories && subcategories.length > 0) {
        for (const subcategoryData of subcategories) {
          const { filters: subFilters, ...subFields } = subcategoryData;

          const subcategory = await Subcategory.create({
            ...subFields,
            categoryId: category.id,
          });

          if (subFilters && subFilters.length > 0) {
            for (const subFilter of subFilters) {
              const subFilterInstance = await Filter.create({
                name: subFilter.name,
                subcategoryId: subcategory.id,
              });

              if (subFilter.options && subFilter.options.length > 0) {
                for (const option of subFilter.options) {
                  await FilterOption.create({
                    filterId: subFilterInstance.id,
                    option,
                  });
                }
              }
            }
          }
        }
      }
    }

    return res
      .status(201)
      .json({ message: "Categories and subcategories created successfully!" });
  } catch (error) {
    console.error("Error creating categories:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
