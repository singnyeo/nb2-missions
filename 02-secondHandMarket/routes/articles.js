var express = require("express");
const { assert } = require("superstruct");
const { db } = require("../utils/db");
const { CreateDto } = require("../dtos/article.dto");

var router = express.Router();

// 게시글 등록
router.post("/create", async (req, res) => {
  try {
    assert(req.body, CreateDto);
    const { title, content } = req.body;

    const article = await db.article.create({
      data: { title, content },
    });

    res.status(201).json({ id: article.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;