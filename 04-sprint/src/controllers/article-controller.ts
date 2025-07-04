import prisma from '../lib/prisma';
import { Request, Response } from 'express';

export async function createArticle(req: Request, res: Response) {
  const { title, content, productId } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });
  }

  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        userId: req.user.id,
        productId: productId ? parseInt(productId) : undefined,
      },
    });
    res.status(201).json({ message: '게시글 등록 완료', article });
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    res.status(500).json({ message: '게시글 등록 실패. 서버 에러. 잠시 후 다시 시도해주세요.' });
  }
}

export async function getArticles(req: Request, res: Response) {
  try {
    const articles = await prisma.article.findMany({
      include: {
        user: {
          select: { id: true, nickname: true, image: true },
        },
        product: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(articles);
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    res.status(500).json({ message: '게시글 목록 조회 실패. 서버 에러. 잠시 후 다시 시도해주세요.' });
  }
}

export async function getArticleById(req: Request, res: Response) {
  const articleId = parseInt(req.params.id);
  const userId = req.user?.id;

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        user: { select: { id: true, nickname: true, image: true } },
        likes: true,
        comment: true,
        product: { select: { id: true, name: true } },
      },
    });

    if (!article) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const isLiked = userId
      ? article.likes.some(like => like.userId === userId)
      : false;

    const { likes, ...articleWithoutLikes } = article;

    const response = {
      ...articleWithoutLikes,
      isLiked,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    res.status(500).json({ message: '서버 에러' });
  }
}


export async function updateArticle(req: Request, res: Response) {
  const articleId = parseInt(req.params.id);
  const { title, content } = req.body;

  try {
    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    if (article.userId !== req.user.id) {
      return res.status(403).json({ message: '게시글 수정 권한이 없습니다.' });
    }

    const updated = await prisma.article.update({
      where: { id: articleId },
      data: { title, content },
    });

    res.status(200).json({ message: '게시글 수정 완료', article: updated });
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    res.status(500).json({ message: '게시글 수정 실패. 서버 에러. 잠시 후 다시 시도해주세요.' });
  }
}

export async function deleteArticle(req: Request, res: Response) {
  const articleId = parseInt(req.params.id);

  try {
    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    if (article.userId !== req.user.id) {
      return res.status(403).json({ message: '게시글 삭제 권한이 없습니다.' });
    }

    await prisma.article.delete({ where: { id: articleId } });
    res.status(200).json({ message: '게시글 삭제 완료' });
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    res.status(500).json({ message: '게시글 삭제 실패. 서버 에러. 잠시 후 다시 시도해주세요.' });
  }
}