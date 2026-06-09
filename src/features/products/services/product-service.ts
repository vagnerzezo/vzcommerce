import { getApiBaseUrl } from "@/lib/env";

const api = getApiBaseUrl();

export async function getProducts() {
  const res = await fetch(`${api}/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${api}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Produto não encontrado");
  }
  return res.json();
}

export async function searchProducts(query: string) {
  const res = await fetch(`${api}/products/search?q=${query}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return res.json();
}

export async function getCategory(category: string) {
  const res = await fetch(`${api}/products/category/${category}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar categoria");
  }
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${api}/products/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar categorias");
  }
  return res.json();
}

export async function getShowcases() {
  const res = await fetch(`${api}/products/category/laptops`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar showcases");
  }
  return res.json();
}