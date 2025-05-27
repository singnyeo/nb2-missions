var express = require("express");
const { assert } = require("superstruct");
const { db } = require("../utils/db");
const { CreateDto } = require("../dtos/product.dto");

var router = express.Router();

//상품 등록 API
router.post("/create", async (req, res, next) => {
  try {
    assert(req.body, CreateDto);
    const { name, description, price, tags } = req.body;
    const productPost = await db.product.create({
      data: { name, description, price, tags },
    });
    res.json({ id: productPost.id });
  } catch (error) {
    next(error);
  }
});

//상품 상세 조회 API
router.get("/product", async (req, res, next) => {
  try {
    const productGet = await db.product.findMany();
    res.json(productGet);
  } catch (error) {
    next(error);
  }
});

//상품 수정 API
router.patch("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, description, price, tags } = req.body;
    const patchProduct = await db.product.update({
      where: { id: productId },
      data: { name, description, price, tags },
    });
    res.json(patchProduct);
  } catch (error) {
    next(error);
  }
});

// 상품 삭제 API
router.delete("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const productDelete = await db.product.delete({
      where: { id: productId },
    });
    res.json(productDelete);
  } catch (error) {
    next(error);
  }
});

//상품 목록 조회 API
router.get("/list", async (req, res, next) => {
  try {
    const { offset = 0, limit = 10, keyword = "", sort = "recent" } = req.query;

    const products = await db.product.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      where: {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      },
      orderBy: {
        createdAt: sort === "recent" ? "desc" : "asc",
      },
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
