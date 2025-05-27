const express = require("express");
const { db } = require("../../utils/db");

var router = express.Router();

// 댓글 등록
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

// 댓글 수정
router.patch('/:commentId', async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: '수정 할 댓글이 존재하지 않음' });
    }

    const updatedComment = await db.comment.update({
      where: { id: commentId },
      data: { content },
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: '댓글 수정 실패' });
  }
});

// 댓글 삭제
router.delete('/:commentId', async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId);

    await db.comment.delete({
      where: { id: commentId },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: '댓글 삭제 실패' });
  }
});


module.exports = router;
