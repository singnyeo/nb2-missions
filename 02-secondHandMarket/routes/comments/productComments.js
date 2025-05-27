const express = require("express");
const { db } = require("../../utils/db");

var router = express.Router();

// product 댓글 등록
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    const productId = parseInt(req.params.productId);

    const comment = await db.comment.create({
      data: { content, productId },
    });

    res.status(201).json({ id: comment.id });
  } catch (error) {
    res.status(400).json({ error: "댓글 등록 실패" });
  }
});

module.exports = router;
