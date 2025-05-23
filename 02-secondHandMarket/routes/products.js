var express = require('express');
const { assert } =  require('superstruct');
const { db } = require('../utils/db');
const { CreateDto } = require('../dtos/product.dto');

var router = express.Router();

//상품 등록 API
router.post ('/create', async (req, res, next) => {
  assert(req.body, CreateDto)

  const { name, description, price, tags } = req.body;

  const product = await db.product.create({
    data : { name, description, price, tags },
  });
  res.json({ id : product.id })
});

//상품 상세 조회 API
router.get('/list', async (req, res, next) => {
  const products = await db.product.findMany();
  res.json(products);
});

//상품 수정 API
router.patch('/:id', async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, description, price, tag } = req.body;

    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: { name, description, price, tag },
    });

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// //상품 삭제 API
// router.delete()
module.exports = router;