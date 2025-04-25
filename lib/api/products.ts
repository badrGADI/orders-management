import { generateMockProducts } from "../mock-data"

// This is a mock API implementation
// In a real app, these functions would make actual API calls

export async function searchProducts(query = "", id = "") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockProducts = generateMockProducts(30)

  if (id) {
    return mockProducts.filter((product) => product.id === id)
  }

  if (!query) {
    return mockProducts.slice(0, 5)
  }

  const queryLower = query.toLowerCase()
  return mockProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(queryLower) || product.description.toLowerCase().includes(queryLower),
    )
    .slice(0, 10)
}
