import { Request, Response } from "express";
import Category from "../../model/category.model";

export const index = async (req: Request, res: Response) => {
  // SELECT * FROM categories WHERE deleted = false AND status = "active";
  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  });

  res.render("client/pages/categories/index", {
    pageTitle: "Danh mục",
    categories: categories
  });
}