import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import sequelize from "../../../shared/config/pg_database";
import { Op, Transaction } from "sequelize";
import Category from "../models/categoryModel";
import Subcategory from "../models/subcategoryModel";
import Filter from "../models/categoryFilterModel";
import AppError from "../../../shared/utils/AppError";
import FilterOption from "../models/filterOption";

export const categoryController = {
  createCategory: catchAsync(async (req: Request, res: Response) => {
    const categoryData = req.body;

    console.log(categoryData);

    if (!categoryData.name || !categoryData.slug) {
      throw new Error("Name and slug are required for a category.");
    }

    if (categoryData.subcategories) {
      categoryData.subcategories.forEach((subData: any) => {
        if (!subData.name || !subData.slug) {
          throw new Error("Name and slug are required for a subcategory.");
        }
      });
    }

    const category = await sequelize.transaction(async (t: Transaction) => {
      // Create category
      const newCategory = await Category.create(
        {
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          icon: categoryData.icon,
          banner: categoryData.banner,
          color: categoryData.color,
          itemCount: categoryData.itemCount,
          featured: categoryData.featured,
          trending: categoryData.trending,
        },
        { transaction: t }
      );

      // Create subcategories if provided
      if (categoryData.subcategories?.length) {
        await Promise.all(
          categoryData.subcategories.map(async (subData: any) => {
            try {
              // Create subcategory
              const subcategory = await Subcategory.create(
                {
                  name: subData.name,
                  slug: subData.slug,
                  description: subData.description,
                  itemCount: subData.itemCount,
                  categoryId: Number(newCategory.id),
                },
                { transaction: t }
              );

              // Create subcategory filters if provided
              if (subData.filters?.length) {
                await Promise.all(
                  subData.filters.map(async (filter: any) => {
                    console.log("Creating filter with data:", {
                      name: subcategory.name,
                      categoryId: subcategory.categoryId,
                      subcategoryId: subcategory.id,
                    });

                    if (
                      subcategory.categoryId === null ||
                      subcategory.id === null
                    ) {
                      res.json({ msg: "NO IDS " });
                    }
                    const newFilter = await Filter.create(
                      {
                        name: filter.name,
                        subcategoryId: Number(subcategory.id),
                        categoryId: Number(subcategory.categoryId),
                      },
                      { transaction: t }
                    );

                    // Create filter options
                    if (filter.options?.length) {
                      await Promise.all(
                        filter.options.map((option: string) =>
                          FilterOption.create(
                            {
                              option: option,
                              filterId: newFilter.id,
                            },
                            { transaction: t }
                          )
                        )
                      );
                    }
                  })
                );
              }
            } catch (err) {
              console.error("Error creating subcategory:", err);
              throw err; // Propagate the error to roll back the transaction
            }
          })
        );
      }

      // Create category filters if provided
      if (categoryData.filters?.length) {
        await Promise.all(
          categoryData.filters.map(async (filter: any) => {
            const newFilter = await Filter.create(
              {
                name: filter.name,
                categoryId: newCategory.id,
              },
              { transaction: t }
            );

            // Create filter options
            if (filter.options?.length) {
              await Promise.all(
                filter.options.map((option: string) =>
                  FilterOption.create(
                    {
                      option: option,
                      filterId: newFilter.id,
                    },
                    { transaction: t }
                  )
                )
              );
            }
          })
        );
      }

      return newCategory;
    });

    // Fetch the complete category with all associations
    const categoryWithAssociations = await Category.findByPk(category.id, {
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          include: [
            {
              model: Filter,
              as: "filters",
              include: [{ model: FilterOption, as: "options" }],
            },
          ],
        },
        {
          model: Filter,
          as: "filters",
          include: [{ model: FilterOption, as: "options" }],
        },
      ],
    });

    res.status(201).json({
      status: "success",
      data: {
        category: categoryWithAssociations,
      },
    });
  }),

  // Get all categories
  getAllCategories: catchAsync(async (req: Request, res: Response) => {
    // const categories = await Category.findAll({
    //   attributes: [
    //     "id",
    //     "name",
    //     "status",
    //     "slug",
    //     "itemCount",
    //     "banner",
    //     "icon",
    //     "description",
    //   ],
    //   include: [
    //     {
    //       model: Subcategory,
    //       as: "subcategories",
    //       attributes: ["id", "name", "slug", "itemCount", "description"],
    //       include: [
    //         {
    //           model: Filter,
    //           as: "filters",
    //           attributes: ["id", "name"],
    //           include: [
    //             {
    //               model: FilterOption,
    //               as: "options",
    //               attributes: ["id", "option"],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       model: Filter,
    //       as: "filters",
    //       attributes: ["id", "name"],
    //       include: [
    //         {
    //           model: FilterOption,
    //           as: "options",
    //           attributes: ["id", "option"],
    //         },
    //       ],
    //     },
    //   ],
    //   limit: 10, // Implement pagination
    //   offset: 0,
    // });

    // const categories = await Category.findAll({
    //   attributes: [
    //     "id",
    //     "name",
    //     "status",
    //     "slug",
    //     "itemCount",
    //     "banner",
    //     "icon",
    //     "description",
    //   ],
    //   limit: 5, // Limit categories
    //   offset: 0,
    //   include: [
    //     {
    //       model: Subcategory,
    //       as: "subcategories",
    //       attributes: ["id", "name", "slug", "itemCount", "description"],
    //       limit: 3, // Limit subcategories per category
    //       include: [
    //         {
    //           model: Filter,
    //           as: "filters",
    //           attributes: ["id", "name"],
    //           limit: 2, // Limit filters per subcategory
    //           include: [
    //             {
    //               model: FilterOption,
    //               as: "options",
    //               attributes: ["id", "option"],
    //               limit: 3, // Limit filter options per filter
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       model: Filter,
    //       as: "filters",
    //       attributes: ["id", "name"],
    //       limit: 2, // Limit filters per category
    //       include: [
    //         {
    //           model: FilterOption,
    //           as: "options",
    //           attributes: ["id", "option"],
    //           limit: 3, // Limit filter options per filter
    //         },
    //       ],
    //     },
    //   ],
    // });

    const limit = 6; // Number of categories per request
    const categoryOffset = 0;

    const categories = await Category.findAll({
      attributes: [
        "id",
        "name",
        "status",
        "slug",
        "itemCount",
        "banner",
        "icon",
        "description",
      ],
      limit: limit,
      offset: categoryOffset, // Pagination for categories
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          attributes: ["id", "name", "slug", "itemCount", "description"],
          limit: 3, // Limit subcategories
          // offset: 0, // First round, start from 0
          include: [
            {
              model: Filter,
              as: "filters",
              attributes: ["id", "name"],
              limit: 2, // Limit filters per subcategory
              // offset: 0,
              include: [
                {
                  model: FilterOption,
                  as: "options",
                  attributes: ["id", "option"],
                  limit: 3,
                  // offset: 0,
                },
              ],
            },
          ],
        },
        {
          model: Filter,
          as: "filters",
          attributes: ["id", "name"],
          limit: 2, // Limit filters per category
          // offset: 0,
          include: [
            {
              model: FilterOption,
              as: "options",
              attributes: ["id", "option"],
              limit: 3, // Limit filter options
              // offset: 0,
            },
          ],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
      },
    });
  }),

  getCategory: catchAsync(async (req: Request, res: Response) => {
    const { identifier, id } = req.params;

    const category = await Category.findOne({
      where: sequelize.or(
        { id: id }
        // { id: isNaN(+identifier) ? null : +identifier }
        // { slug: identifier }
      ),
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          include: [
            {
              model: Filter,
              as: "filters",
              include: [{ model: FilterOption, as: "options" }],
            },
          ],
        },
        {
          model: Filter,
          as: "filters",
          include: [{ model: FilterOption, as: "options" }],
        },
      ],
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  }),

  // Update category
  updateCategory: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    await sequelize.transaction(async (t: Transaction) => {
      await category.update(updateData, { transaction: t });

      // Update filters if provided
      if (updateData.filters) {
        await Filter.destroy({
          where: { categoryId: id },
          transaction: t,
        });

        await Promise.all(
          updateData.filters.map((filter: any) =>
            Filter.create({ ...filter, categoryId: id }, { transaction: t })
          )
        );
      }
    });

    // Fetch updated category with associations
    const updatedCategory = await Category.findByPk(id, {
      include: [
        { model: Subcategory, as: "subcategories" },
        { model: Filter, as: "filters" },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        category: updatedCategory,
      },
    });
  }),

  deleteCategory: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const transaction = await sequelize.transaction();

      try {
        const category = await Category.findOne({
          where: { id },
          transaction,
        });

        if (!category) {
          await transaction.rollback();
          return next(new AppError("Category not found", 404));
        }

        const subcategories = await Subcategory.findAll({
          where: { categoryId: category.id },
          transaction,
        });

        const subcategoryIds = subcategories.map((sub) => sub.id);

        const filters = await Filter.findAll({
          where: {
            [Op.or]: [
              { categoryId: category.id },
              { subcategoryId: { [Op.in]: subcategoryIds } },
            ],
          },
          transaction,
        });

        const filterIds = filters.map((filter) => filter.id);

        await FilterOption.destroy({
          where: { filterId: { [Op.in]: filterIds } },
          transaction,
        });

        await Filter.destroy({
          where: { id: { [Op.in]: filterIds } },
          transaction,
        });

        await Subcategory.destroy({
          where: { id: { [Op.in]: subcategoryIds } },
          transaction,
        });

        await Category.destroy({
          where: { id },
          transaction,
        });

        await transaction.commit();

        res.status(204).json({
          status: "success",
          data: null,
        });
      } catch (error) {
        await transaction.rollback();
        console.error("Error deleting category:", (error as any).message);
        next(new AppError("Failed to delete category", 500));
      }
    }
  ),

  // Add subcategory to category
  addSubcategory: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const subcategoryData = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const subcategory = await sequelize.transaction(async (t: Transaction) => {
      const newSubcategory = await Subcategory.create(
        { ...subcategoryData, categoryId: id },
        { transaction: t }
      );

      // Create filters if provided
      if (subcategoryData.filters?.length) {
        await Promise.all(
          subcategoryData.filters.map((filter: any) =>
            Filter.create(
              { ...filter, subcategoryId: newSubcategory.id },
              { transaction: t }
            )
          )
        );
      }

      return newSubcategory;
    });

    // Fetch the subcategory with its filters
    const subcategoryWithFilters = await Subcategory.findByPk(subcategory.id, {
      include: [{ model: Filter, as: "filters" }],
    });

    res.status(201).json({
      status: "success",
      data: {
        subcategory: subcategoryWithFilters,
      },
    });
  }),

  //////////////////////////////
  getSubcategory: catchAsync(async (req: Request, res: Response) => {
    const { categoryId, subcategoryId } = req.params;
    const subcategory = await Subcategory.findOne({
      where: { categoryId: categoryId, id: subcategoryId },
      include: [{ model: Filter, as: "filters" }],
    });

    res.status(2001).json({ subcategory });
  }),
  ///////////////////////////////////

  // Update subcategory
  updateSubcategory: catchAsync(async (req: Request, res: Response) => {
    const { categoryId, subcategoryId } = req.params;
    const updateData = req.body;

    const subcategory = await Subcategory.findOne({
      where: {
        id: subcategoryId,
        categoryId,
      },
    });

    if (!subcategory) {
      throw new AppError("Subcategory not found", 404);
    }

    await sequelize.transaction(async (t: Transaction) => {
      await subcategory.update(updateData, { transaction: t });

      // Update filters if provided
      if (updateData.filters) {
        await Filter.destroy({
          where: { subcategoryId },
          transaction: t,
        });

        await Promise.all(
          updateData.filters.map((filter: any) =>
            Filter.create({ ...filter, subcategoryId }, { transaction: t })
          )
        );
      }
    });

    // Fetch updated subcategory with filters
    const updatedSubcategory = await Subcategory.findByPk(subcategoryId, {
      include: [{ model: Filter, as: "filters" }],
    });

    res.status(200).json({
      status: "success",
      data: {
        subcategory: updatedSubcategory,
      },
    });
  }),

  // Remove subcategory
  removeSubcategory: catchAsync(async (req: Request, res: Response) => {
    const { categoryId, subcategoryId } = req.params;

    const deleted = await Subcategory.destroy({
      where: {
        id: subcategoryId,
        categoryId,
      },
    });

    if (!deleted) {
      throw new AppError("Subcategory not found", 404);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }),

  // Update category filters
  updateFilters: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { filters } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    await sequelize.transaction(async (t: Transaction) => {
      // Remove existing filters
      await Filter.destroy({
        where: { categoryId: id },
        transaction: t,
      });

      // Create new filters
      await Promise.all(
        filters.map((filter: any) =>
          Filter.create({ ...filter, categoryId: id }, { transaction: t })
        )
      );
    });

    // Fetch updated category with filters
    const updatedCategory = await Category.findByPk(id, {
      include: [{ model: Filter, as: "filters" }],
    });

    res.status(200).json({
      status: "success",
      data: {
        category: updatedCategory,
      },
    });
  }),
};
