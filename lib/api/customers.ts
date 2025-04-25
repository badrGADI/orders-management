import { generateMockCustomers } from "../mock-data"

// This is a mock API implementation
// In a real app, these functions would make actual API calls

export async function searchCustomers(query = "", id = "") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockCustomers = generateMockCustomers(20)

  if (id) {
    return mockCustomers.filter((customer) => customer.id === id)
  }

  if (!query) {
    return mockCustomers.slice(0, 5)
  }

  const queryLower = query.toLowerCase()
  return mockCustomers
    .filter(
      (customer) =>
        customer.name.toLowerCase().includes(queryLower) || customer.email.toLowerCase().includes(queryLower),
    )
    .slice(0, 10)
}
