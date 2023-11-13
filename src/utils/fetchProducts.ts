export async function fetchProducts() {
  // 4 is just for convenience
  const limit = 4;
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching products');

    throw error;
  }

  const { products } = await response.json();

  return products;
}
