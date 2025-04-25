import { generateMockOrders, generateMockOrder } from "../mock-data"

// This is a mock API implementation
// In a real app, these functions would make actual API calls

export async function getOrders(page = 1, status = "", search = "") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const pageSize = 10
  const mockOrders = generateMockOrders(50)

  let filteredOrders = [...mockOrders]

  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status.toLowerCase() === status.toLowerCase())
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.reference.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower),
    )
  }

  const totalPages = Math.ceil(filteredOrders.length / pageSize)
  const startIndex = (page - 1) * pageSize
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + pageSize)

  return {
    data: paginatedOrders,
    totalPages,
    currentPage: page,
    totalItems: filteredOrders.length,
  }
}

export async function getRecentOrders() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockOrders = generateMockOrders(5)
  return mockOrders
}

export async function getOrderById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // In a real app, this would fetch the specific order from the API
  // For now, we'll generate a mock order with the given ID
  return generateMockOrder(id)
}

export async function createOrder(orderData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would send the order data to the API
  // For now, we'll just return a mock order with a new ID
  const newOrder = {
    ...orderData,
    id: Math.random().toString(36).substring(2, 9),
    reference: `ORD-${Date.now().toString().substring(9)}`,
    createdAt: new Date().toISOString(),
  }

  return newOrder
}

export async function updateOrder(id: string, orderData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would update the order in the API
  // For now, we'll just return the updated order
  return {
    ...orderData,
    id,
    updatedAt: new Date().toISOString(),
  }
}

export async function updateOrderStatus(id: string, status: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would update the order status in the API
  // For now, we'll just return success
  return { success: true, id, status }
}
