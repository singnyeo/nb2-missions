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
module.exports = router;