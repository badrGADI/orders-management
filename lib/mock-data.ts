import type { Order, Customer, Product, OrderItem } from "./types"

// Helper function to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 9)

// Helper function to generate random dates within the last 30 days
const generateRandomDate = () => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  return new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime())).toISOString()
}

// Generate mock customers
export const generateMockCustomers = (count: number): Customer[] => {
  const customers: Customer[] = []

  for (let i = 0; i < count; i++) {
    customers.push({
      id: generateId(),
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `+33 ${Math.floor(Math.random() * 10000000000)
        .toString()
        .padStart(10, "0")}`,
      address: `${Math.floor(Math.random() * 100) + 1} Rue de Paris, 75000 Paris, France`,
    })
  }

  return customers
}

// Generate mock products
export const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = []
  const categories = ["Electronics", "Clothing", "Books", "Home", "Food"]

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    products.push({
      id: generateId(),
      name: `${category} Item ${i + 1}`,
      description: `This is a ${category.toLowerCase()} item description.`,
      price: Number.parseFloat((Math.random() * 100 + 10).toFixed(2)),
      stock: Math.floor(Math.random() * 100),
    })
  }

  return products
}

// Generate mock order items
const generateMockOrderItems = (count: number): OrderItem[] => {
  const items: OrderItem[] = []
  const products = generateMockProducts(count * 2)

  for (let i = 0; i < count; i++) {
    const product = products[i]
    const quantity = Math.floor(Math.random() * 5) + 1
    items.push({
      id: generateId(),
      product,
      quantity,
      unitPrice: product.price,
    })
  }

  return items
}

// Generate a single mock order
export const generateMockOrder = (id?: string): Order => {
  const statuses = ["new", "processing", "shipped", "delivered", "cancelled"]
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  const items = generateMockOrderItems(Math.floor(Math.random() * 3) + 1)
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const tax = Number.parseFloat((subtotal * 0.2).toFixed(2))
  const shipping = Number.parseFloat((Math.random() * 10 + 5).toFixed(2))

  return {
    id: id || generateId(),
    reference: `ORD-${Date.now().toString().substring(9)}`,
    createdAt: generateRandomDate(),
    status,
    customer: generateMockCustomers(1)[0],
    items,
    subtotal,
    tax,
    shipping,
    totalAmount: subtotal + tax + shipping,
  }
}

// Generate multiple mock orders
export const generateMockOrders = (count: number): Order[] => {
  const orders: Order[] = []

  for (let i = 0; i < count; i++) {
    orders.push(generateMockOrder())
  }

  // Sort by date, newest first
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
