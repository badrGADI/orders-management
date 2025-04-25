export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
}

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  reference: string
  createdAt: string
  status: string
  customer: Customer
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  totalAmount: number
}

export interface PaginatedResponse<T> {
  data: T[]
  totalPages: number
  currentPage: number
  totalItems: number
}
