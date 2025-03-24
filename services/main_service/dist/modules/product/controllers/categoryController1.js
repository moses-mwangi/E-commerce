"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategories = void 0;
const categoryModel_1 = __importDefault(require("../models/category/categoryModel"));
const categoryFilterModel_1 = __importDefault(require("../models/category/categoryFilterModel"));
const filterOption_1 = __importDefault(require("../models/category/filterOption"));
const subcategoryModel_1 = __importDefault(require("../models/category/subcategoryModel"));
const createCategories = async (req, res) => {
    try {
        const { categories } = req.body;
        for (const categoryData of categories) {
            const { filters, subcategories, ...categoryFields } = categoryData;
            const category = await categoryModel_1.default.create(categoryFields);
            if (filters && filters.length > 0) {
                for (const filter of filters) {
                    const filterInstance = await categoryFilterModel_1.default.create({
                        name: filter.name,
                        categoryId: category.id,
                    });
                    if (filter.options && filter.options.length > 0) {
                        for (const option of filter.options) {
                            await filterOption_1.default.create({
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
                    const subcategory = await subcategoryModel_1.default.create({
                        ...subFields,
                        categoryId: category.id,
                    });
                    if (subFilters && subFilters.length > 0) {
                        for (const subFilter of subFilters) {
                            const subFilterInstance = await categoryFilterModel_1.default.create({
                                name: subFilter.name,
                                subcategoryId: subcategory.id,
                            });
                            if (subFilter.options && subFilter.options.length > 0) {
                                for (const option of subFilter.options) {
                                    await filterOption_1.default.create({
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
    }
    catch (error) {
        console.error("Error creating categories:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createCategories = createCategories;
