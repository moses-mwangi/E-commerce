import { Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import sequelize from "../../../shared/config/pg_database";
import { Transaction } from "sequelize";
import Category from "../models/categoryModel";
import Subcategory from "../models/subcategoryModel";
import Filter from "../models/categoryFilterModel";
import AppError from "../../../shared/utils/AppError";
import FilterOption from "../models/filterOption";

// export const categoryController = {
//   // Create a new category
//   createCategory: catchAsync(async (req: Request, res: Response) => {
//     const categoryData = req.body;

//     const category = await sequelize.transaction(async (t: Transaction) => {
//       // Create category
//       const newCategory = await Category.create(categoryData, {
//         transaction: t,
//       });

//       // Create filters if provided
//       if (categoryData.filters?.length) {
//         await Promise.all(
//           categoryData.filters.map((filter: any) =>
//             Filter.create(
//               { ...filter, categoryId: newCategory.id },
//               { transaction: t }
//             )
//           )
//         );
//       }

//       return newCategory;
//     });

//     // Fetch the category with its associations
//     const categoryWithAssociations = await Category.findByPk(category.id, {
//       include: [
//         { model: Subcategory, as: "subcategories" },
//         { model: Filter, as: "filters" },
//       ],
//     });

//     res.status(201).json({
//       status: "success",
//       data: {
//         category: categoryWithAssociations,
//       },
//     });
//   }),

//   // Get all categories
//   getAllCategories: catchAsync(async (req: Request, res: Response) => {
//     const categories = await Category.findAll({
//       include: [
//         { model: Subcategory, as: "subcategories" },
//         { model: Filter, as: "filters" },
//       ],
//     });

//     res.status(200).json({
//       status: "success",
//       results: categories.length,
//       data: {
//         categories,
//       },
//     });
//   }),

//   // Get category by ID or slug
//   getCategory: catchAsync(async (req: Request, res: Response) => {
//     const { identifier } = req.params;

//     const category = await Category.findOne({
//       where: sequelize.or(
//         { id: isNaN(+identifier) ? null : +identifier },
//         { slug: identifier }
//       ),
//       include: [
//         {
//           model: Subcategory,
//           as: "subcategories",
//           include: [{ model: Filter, as: "filters" }],
//         },
//         { model: Filter, as: "filters" },
//       ],
//     });

//     if (!category) {
//       throw new AppError("Category not found", 404);
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         category,
//       },
//     });
//   }),

//   // Update category
//   updateCategory: catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const updateData = req.body;

//     const category = await Category.findByPk(id);

//     if (!category) {
//       throw new AppError("Category not found", 404);
//     }

//     await sequelize.transaction(async (t: Transaction) => {
//       await category.update(updateData, { transaction: t });

//       // Update filters if provided
//       if (updateData.filters) {
//         await Filter.destroy({
//           where: { categoryId: id },
//           transaction: t,
//         });

//         await Promise.all(
//           updateData.filters.map((filter: any) =>
//             Filter.create({ ...filter, categoryId: id }, { transaction: t })
//           )
//         );
//       }
//     });

//     // Fetch updated category with associations
//     const updatedCategory = await Category.findByPk(id, {
//       include: [
//         { model: Subcategory, as: "subcategories" },
//         { model: Filter, as: "filters" },
//       ],
//     });

//     res.status(200).json({
//       status: "success",
//       data: {
//         category: updatedCategory,
//       },
//     });
//   }),

//   // Delete category
//   deleteCategory: catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;

//     const deleted = await Category.destroy({
//       where: { id },
//     });

//     if (!deleted) {
//       throw new AppError("Category not found", 404);
//     }

//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   }),

//   // Add subcategory to category
//   addSubcategory: catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const subcategoryData = req.body;

//     const category = await Category.findByPk(id);

//     if (!category) {
//       throw new AppError("Category not found", 404);
//     }

//     const subcategory = await sequelize.transaction(async (t: Transaction) => {
//       const newSubcategory = await Subcategory.create(
//         { ...subcategoryData, categoryId: id },
//         { transaction: t }
//       );

//       // Create filters if provided
//       if (subcategoryData.filters?.length) {
//         await Promise.all(
//           subcategoryData.filters.map((filter: any) =>
//             Filter.create(
//               { ...filter, subcategoryId: newSubcategory.id },
//               { transaction: t }
//             )
//           )
//         );
//       }

//       return newSubcategory;
//     });

//     // Fetch the subcategory with its filters
//     const subcategoryWithFilters = await Subcategory.findByPk(subcategory.id, {
//       include: [{ model: Filter, as: "filters" }],
//     });

//     res.status(201).json({
//       status: "success",
//       data: {
//         subcategory: subcategoryWithFilters,
//       },
//     });
//   }),

//   // Update subcategory
//   updateSubcategory: catchAsync(async (req: Request, res: Response) => {
//     const { categoryId, subcategoryId } = req.params;
//     const updateData = req.body;

//     const subcategory = await Subcategory.findOne({
//       where: {
//         id: subcategoryId,
//         categoryId,
//       },
//     });

//     if (!subcategory) {
//       throw new AppError("Subcategory not found", 404);
//     }

//     await sequelize.transaction(async (t: Transaction) => {
//       await subcategory.update(updateData, { transaction: t });

//       // Update filters if provided
//       if (updateData.filters) {
//         await Filter.destroy({
//           where: { subcategoryId },
//           transaction: t,
//         });

//         await Promise.all(
//           updateData.filters.map((filter: any) =>
//             Filter.create({ ...filter, subcategoryId }, { transaction: t })
//           )
//         );
//       }
//     });

//     // Fetch updated subcategory with filters
//     const updatedSubcategory = await Subcategory.findByPk(subcategoryId, {
//       include: [{ model: Filter, as: "filters" }],
//     });

//     res.status(200).json({
//       status: "success",
//       data: {
//         subcategory: updatedSubcategory,
//       },
//     });
//   }),

//   // Remove subcategory
//   removeSubcategory: catchAsync(async (req: Request, res: Response) => {
//     const { categoryId, subcategoryId } = req.params;

//     const deleted = await Subcategory.destroy({
//       where: {
//         id: subcategoryId,
//         categoryId,
//       },
//     });

//     if (!deleted) {
//       throw new AppError("Subcategory not found", 404);
//     }

//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   }),

//   // Update category filters
//   updateFilters: catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { filters } = req.body;

//     const category = await Category.findByPk(id);

//     if (!category) {
//       throw new AppError("Category not found", 404);
//     }

//     await sequelize.transaction(async (t: Transaction) => {
//       // Remove existing filters
//       await Filter.destroy({
//         where: { categoryId: id },
//         transaction: t,
//       });

//       // Create new filters
//       await Promise.all(
//         filters.map((filter: any) =>
//           Filter.create({ ...filter, categoryId: id }, { transaction: t })
//         )
//       );
//     });

//     // Fetch updated category with filters
//     const updatedCategory = await Category.findByPk(id, {
//       include: [{ model: Filter, as: "filters" }],
//     });

//     res.status(200).json({
//       status: "success",
//       data: {
//         category: updatedCategory,
//       },
//     });
//   }),
// };

export const categoryController = {
  // Create a new category
  // createCategory: catchAsync(async (req: Request, res: Response) => {
  //   const categoryData = req.body;

  //   const category = await sequelize.transaction(async (t: Transaction) => {
  //     // Create category
  //     const newCategory = await Category.create(
  //       {
  //         name: categoryData.name,
  //         slug: categoryData.slug,
  //         description: categoryData.description,
  //         icon: categoryData.icon,
  //         banner: categoryData.banner,
  //         color: categoryData.color,
  //         itemCount: categoryData.itemCount,
  //         featured: categoryData.featured,
  //         trending: categoryData.trending,
  //       },
  //       { transaction: t }
  //     );

  //     // if (categoryData.subcategories?.length) {
  //     //   await Promise.all(
  //     //     categoryData.subcategories.map(async (subData: any) => {
  //     //       // Create subcategory
  //     //       const subcategory = await Subcategory.create(
  //     //         {
  //     //           ...subData,
  //     //           categoryId: newCategory.id,
  //     //         },
  //     //         { transaction: t }
  //     //       );

  //     //       // Create subcategory filters if provided
  //     //       if (subData.filters?.length) {
  //     //         await Promise.all(
  //     //           subData.filters.map((filter: any) =>
  //     //             Filter.create(
  //     //               {
  //     //                 ...filter,
  //     //                 subcategoryId: subcategory.id,
  //     //               },
  //     //               { transaction: t }
  //     //             )
  //     //           )
  //     //         );
  //     //       }
  //     //     })
  //     //   );
  //     // }
  //     if (categoryData.subcategories?.length) {
  //       await Promise.all(
  //         categoryData.subcategories.map(async (subData: any) => {
  //           // Create subcategory
  //           const subcategory = await Subcategory.create(
  //             {
  //               name: subData.name,
  //               slug: subData.slug,
  //               description: subData.description,
  //               itemCount: subData.itemCount,
  //               categoryId: newCategory.id,
  //             },
  //             { transaction: t }
  //           );

  //           // Create subcategory filters if provided
  //           if (subData.filters?.length) {
  //             await Promise.all(
  //               subData.filters.map(async (filter: any) => {
  //                 const newFilter = await Filter.create(
  //                   {
  //                     name: filter.name,
  //                     subcategoryId: subcategory.id,
  //                   },
  //                   { transaction: t }
  //                 );

  //                 // Create filter options
  //                 if (filter.options?.length) {
  //                   await Promise.all(
  //                     filter.options.map((option: string) =>
  //                       FilterOption.create(
  //                         {
  //                           name: option,
  //                           filterId: newFilter.id,
  //                         },
  //                         { transaction: t }
  //                       )
  //                     )
  //                   );
  //                   console.log("ggggggggggggggg", filter);
  //                 }
  //               })
  //             );
  //           }
  //         })
  //       );
  //     }

  //     //// Create category filters if provided
  //     if (categoryData.filters?.length) {
  //       console.log(categoryData.filters);
  //       await Promise.all(
  //         categoryData.filters.map((filter: any) =>
  //           Filter.create(
  //             {
  //               ...filter,
  //               categoryId: newCategory.id,
  //             },
  //             { transaction: t }
  //           )
  //         )
  //       );
  //     }

  //     return newCategory;
  //   });

  //   //// Fetch the complete category with all associations
  //   const categoryWithAssociations = await Category.findByPk(category.id, {
  //     include: [
  //       {
  //         model: Subcategory,
  //         as: "subcategories",
  //         include: [{ model: Filter, as: "filters" }],
  //       },
  //       { model: Filter, as: "filters" },
  //     ],
  //   });

  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       category: categoryWithAssociations,
  //     },
  //   });
  // }),

  createCategory: catchAsync(async (req: Request, res: Response) => {
    const categoryData = req.body;

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
            // Create subcategory
            const subcategory = await Subcategory.create(
              {
                name: subData.name,
                slug: subData.slug,
                description: subData.description,
                itemCount: subData.itemCount,
                categoryId: newCategory.id,
              },
              { transaction: t }
            );

            // Create subcategory filters if provided
            if (subData.filters?.length) {
              await Promise.all(
                subData.filters.map(async (filter: any) => {
                  const newFilter = await Filter.create(
                    {
                      name: filter.name,
                      subcategoryId: subcategory.id,
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
                      option: option, // ✅ Now correctly assigning the option name
                      filterId: newFilter.id, // ✅ Linking to the newly created Filter
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
    const categories = await Category.findAll({
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

    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
      },
    });
  }),

  // Get category by ID or slug
  getCategory: catchAsync(async (req: Request, res: Response) => {
    const { identifier } = req.params;

    const category = await Category.findOne({
      where: sequelize.or(
        { id: isNaN(+identifier) ? null : +identifier },
        { slug: identifier }
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

  // Delete category
  deleteCategory: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await Category.destroy({
      where: { id },
    });

    if (!deleted) {
      throw new AppError("Category not found", 404);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }),

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
