const BASE_URL = "https://panda-market-api-crud.vercel.app/articles";

export async function getArticleList({ page, pageSize, keyword }) {
  const query = new URLSearchParams({ page, pageSize, keyword }).toString();
  try {
    const res = await fetch(`${BASE_URL}?${query}`, { method: 'GET' });
    if (!res.ok) {
      throw new Error('API 에러');
    }
    return await res.json();
  } catch (error) {
    console.error('getArticleList 에러:', error);
  }
}

export async function getArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'GET' });
    if (!res.ok) {
      throw new Error('API 에러');
    }
    return await res.json();
  } catch (error) {
    console.error('getArticle 에러:', error);
  }
}

export async function createArticle({ title, content, image }) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, image }),
    });
    if (!res.ok) {
      throw new Error('API 에러');
    }
    return await res.json();
  } catch (error) {
    console.error('createArticle 에러:', error);
  }
}

export async function patchArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error('API 에러');
    }
    return await res.json();
  } catch (error) {
    console.error('patchArticle 에러:', error);
  }
}

export async function deleteArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { 
      method: "DELETE" 
    });
    if (!res.ok) {
      throw new Error('API 에러');
    }
    return await res.json();
  } catch (error) {
    console.error('deleteArticle 에러:', error);
  }
}
