const BASE_URL = "https://panda-market-api-crud.vercel.app/articles";


async function getArticleList({ page, pageSize, keyword }) {
  const query = new URLSearchParams({ page, pageSize, keyword }).toString();
  const res = await fetch(`${BASE_URL}?${query}`, {
    method : 'GET'
  });
  return await res.json();
}


async function getArticle(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method : 'GET'
  });
  return await res.json();
}


async function createArticle({ title, content, image }) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, image }),
  });
  return await res.json();
}


async function patchArticle(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}


async function deleteArticle(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}
