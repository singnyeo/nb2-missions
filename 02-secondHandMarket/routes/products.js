var express = require('express');
const { assert } =  require('superstruct');
const { db } = require('../utils/db');
const { CreateDto } = require('../dtos/product.dto');

var router = express.Router();

router.post ('/create', async (req, res, next) => {
  assert(req.body, CreateDto)

  const { name, description, price, tags } = req.body;

  const product = await db.product.create({
    data : { name, description, price, tags },
  });
  res.json({ id : product.id })
});

module.exports = router;