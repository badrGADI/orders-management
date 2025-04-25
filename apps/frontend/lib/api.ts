import axios from "axios";
import type { Order, Customer, Product, PaginatedResponse } from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://orders-management-production.up.railway.app/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Dashboard
export async function getDashboardStats() {
  const response = await api.get("/dashboard/stats");
  return response.data;
}

// Orders
export async function getOrders(
  page = 1,
  status = "",
  search = ""
): Promise<PaginatedResponse<Order>> {
  const response = await api.get("/orders", {
    params: { page, status, search },
  });
  return response.data;
}

export async function getRecentOrders(): Promise<Order[]> {
  const response = await api.get("/orders/recent");
  return response.data;
}

export async function getOrderById(id: string): Promise<Order> {
  const response = await api.get(`/orders/${id}`);
  return response.data;
}

export async function createOrder(orderData: any): Promise<Order> {
  const response = await api.post("/orders", orderData);
  return response.data;
}

export async function updateOrder(id: string, orderData: any): Promise<Order> {
  const response = await api.put(`/orders/${id}`, orderData);
  return response.data;
}

export async function updateOrderStatus(
  id: string,
  status: string
): Promise<Order> {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
}

// Customers
export async function searchCustomers(
  query = "",
  id = ""
): Promise<Customer[]> {
  const response = await api.get("/customers", {
    params: { query, id },
  });
  return response.data;
}

// Products
export async function searchProducts(query = "", id = ""): Promise<Product[]> {
  const response = await api.get("/products", {
    params: { query, id },
  });
  return response.data;
}
