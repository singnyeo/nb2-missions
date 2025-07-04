import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from '../controllers/article-controller.js';
import { getLikedArticles } from '../controllers/like-controller.js';

const router = express.Router();
router.get('/articles/liked', authenticate, getLikedArticles);
router.post('/articles', authenticate, createArticle);
router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.put('/articles/:id', authenticate, updateArticle);
router.delete('/articles/:id', authenticate, deleteArticle);

export default router;