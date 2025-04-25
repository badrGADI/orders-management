"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  Select,
  Button,
  Group,
  Card,
  Text,
  Divider,
  NumberInput,
  Table,
  ActionIcon,
  Autocomplete,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import type { Order, Customer, Product } from "@/lib/types";
import { createOrder, updateOrder } from "@/lib/api";
import { searchCustomers } from "@/lib/api";
import { searchProducts } from "@/lib/api";

interface OrderFormProps {
  initialData?: Order;
}

export function OrderForm({ initialData }: OrderFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customerSearchLoading, setCustomerSearchLoading] = useState(false);
  const [productSearchLoading, setProductSearchLoading] = useState(false);
  const [customerOptions, setCustomerOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [productOptions, setProductOptions] = useState<
    { value: string; label: string; data: Product }[]
  >([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    initialData?.customer || null
  );

  const form = useForm({
    initialValues: {
      status: initialData?.status || "new",
      customerId: initialData?.customer?.id || "",
      customerName: initialData?.customer?.name || "",
      customerEmail: initialData?.customer?.email || "",
      customerPhone: initialData?.customer?.phone || "",
      customerAddress: initialData?.customer?.address || "",
      items:
        initialData?.items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })) || [],
      shipping: initialData?.shipping || 0,
      tax: initialData?.tax || 0,
    },
    validate: {
      customerName: (value) => (value ? null : "Customer name is required"),
      customerEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      customerPhone: (value) => (value ? null : "Phone number is required"),
      customerAddress: (value) => (value ? null : "Address is required"),
      items: {
        productId: (value) => (value ? null : "Product is required"),
        quantity: (value) =>
          value > 0 ? null : "Quantity must be greater than 0",
        unitPrice: (value) =>
          value > 0 ? null : "Price must be greater than 0",
      },
    },
  });

  const handleCustomerSearch = async (query: string) => {
    if (query.length < 2) return;

    setCustomerSearchLoading(true);
    try {
      const customers = await searchCustomers(query);
      setCustomerOptions(
        customers.map((customer) => ({
          value: customer.id,
          label: `${customer.name} (${customer.email})`,
        }))
      );
    } catch (error) {
      console.error("Failed to search customers:", error);
    } finally {
      setCustomerSearchLoading(false);
    }
  };

  const handleCustomerSelect = async (customerId: string) => {
    try {
      const customers = await searchCustomers("", customerId);
      if (customers.length > 0) {
        const customer = customers[0];
        setSelectedCustomer(customer);
        form.setValues({
          ...form.values,
          customerId: customer.id,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          customerAddress: customer.address,
        });
      }
    } catch (error) {
      console.error("Failed to get customer details:", error);
    }
  };

  const handleProductSearch = async (query: string) => {
    if (query.length < 2) return;

    setProductSearchLoading(true);
    try {
      const products = await searchProducts(query);
      setProductOptions(
        products.map((product) => ({
          value: product.id,
          label: `${product.name} (${product.price.toFixed(2)} €)`,
          data: product,
        }))
      );
    } catch (error) {
      console.error("Failed to search products:", error);
    } finally {
      setProductSearchLoading(false);
    }
  };

  const addItem = () => {
    form.insertListItem("items", {
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
    });
  };

  const removeItem = (index: number) => {
    form.removeListItem("items", index);
  };

  const handleProductSelect = (value: string, index: number) => {
    const product = productOptions.find((p) => p.value === value)?.data;
    if (product) {
      form.setFieldValue(`items.${index}.productId`, product.id);
      form.setFieldValue(`items.${index}.productName`, product.name);
      form.setFieldValue(`items.${index}.unitPrice`, product.price);
    }
  };

  const calculateSubtotal = () => {
    return form.values.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + form.values.shipping + form.values.tax;
  };

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const subtotal = calculateSubtotal();
      const totalAmount = calculateTotal();

      if (initialData) {
        // For updates, we need to format the data according to UpdateOrderDto
        const updateData = {
          status: values.status,
          customer: {
            id: values.customerId,
            name: values.customerName,
            email: values.customerEmail,
            phone: values.customerPhone,
            address: values.customerAddress,
          },
          items: values.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          subtotal,
          tax: values.tax,
          shipping: values.shipping,
          totalAmount,
        };

        await updateOrder(initialData.id, updateData);
        notifications.show({
          title: "Success",
          message: "Order updated successfully",
          color: "green",
        });
        router.push(`/orders/${initialData.id}`);
      } else {
        // For new orders
        const newOrderData = {
          status: values.status,
          customer: {
            id: values.customerId,
            name: values.customerName,
            email: values.customerEmail,
            phone: values.customerPhone,
            address: values.customerAddress,
          },
          items: values.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          subtotal,
          tax: values.tax,
          shipping: values.shipping,
          totalAmount,
        };

        const newOrder = await createOrder(newOrderData);
        notifications.show({
          title: "Success",
          message: "Order created successfully",
          color: "green",
        });
        router.push(`/orders/${newOrder.id}`);
      }
    } catch (error) {
      console.error("Failed to save order:", error);
      notifications.show({
        title: "Error",
        message: "Failed to save order. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card withBorder radius="md" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
              <Text fw={500}>Order Information</Text>
            </Card.Section>

            <Select
              label="Status"
              placeholder="Select status"
              data={[
                { value: "new", label: "New" },
                { value: "processing", label: "Processing" },
                { value: "shipped", label: "Shipped" },
                { value: "delivered", label: "Delivered" },
                { value: "cancelled", label: "Cancelled" },
              ]}
              {...form.getInputProps("status")}
              mt="md"
            />
          </Card>

          <Card withBorder radius="md" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
              <Text fw={500}>Customer Information</Text>
            </Card.Section>

            <Autocomplete
              label="Search Customer"
              placeholder="Search by name or email"
              data={customerOptions}
              onChange={handleCustomerSearch}
              onOptionSubmit={handleCustomerSelect}
              rightSection={customerSearchLoading ? <Loader size="xs" /> : null}
              mt="md"
            />

            <Divider
              my="md"
              label="Or enter customer details manually"
              labelPosition="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextInput
                label="Name"
                placeholder="Customer name"
                {...form.getInputProps("customerName")}
              />
              <TextInput
                label="Email"
                placeholder="customer@example.com"
                {...form.getInputProps("customerEmail")}
              />
              <TextInput
                label="Phone"
                placeholder="Phone number"
                {...form.getInputProps("customerPhone")}
              />
              <TextInput
                label="Address"
                placeholder="Delivery address"
                {...form.getInputProps("customerAddress")}
              />
            </div>
          </Card>

          <Card withBorder radius="md" p="lg">
            <Card.Section withBorder inheritPadding py="xs" mb="md">
              <Group justify="space-between">
                <Text fw={500}>Order Items</Text>
                <Button
                  leftSection={<IconPlus size={16} />}
                  onClick={addItem}
                  size="xs"
                >
                  Add Item
                </Button>
              </Group>
            </Card.Section>

            {form.values.items.length === 0 ? (
              <Text c="dimmed" ta="center" py="xl">
                No items added. Click "Add Item" to add products to this order.
              </Text>
            ) : (
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Product</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Unit Price (€)</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {form.values.items.map((item, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Autocomplete
                          placeholder="Search product"
                          value={item.productName}
                          data={productOptions}
                          onChange={(query) => {
                            form.setFieldValue(
                              `items.${index}.productName`,
                              query
                            );
                            handleProductSearch(query);
                          }}
                          onOptionSubmit={(value) =>
                            handleProductSelect(value, index)
                          }
                          rightSection={
                            productSearchLoading ? <Loader size="xs" /> : null
                          }
                          error={form.errors[`items.${index}.productId`]}
                        />
                      </Table.Td>
                      <Table.Td>
                        <NumberInput
                          min={1}
                          value={item.quantity}
                          onChange={(value) =>
                            form.setFieldValue(
                              `items.${index}.quantity`,
                              value || 1
                            )
                          }
                          error={form.errors[`items.${index}.quantity`]}
                        />
                      </Table.Td>
                      <Table.Td>
                        <NumberInput
                          min={0}
                          value={item.unitPrice}
                          onChange={(value) =>
                            form.setFieldValue(
                              `items.${index}.unitPrice`,
                              value || 0
                            )
                          }
                          error={form.errors[`items.${index}.unitPrice`]}
                        />
                      </Table.Td>
                      <Table.Td>
                        {(item.quantity * item.unitPrice).toFixed(2)} €
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          color="red"
                          onClick={() => removeItem(index)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Card>
        </div>

        <div>
          <Card withBorder radius="md" p="lg" className="sticky top-4">
            <Card.Section withBorder inheritPadding py="xs">
              <Text fw={500}>Order Summary</Text>
            </Card.Section>

            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <Text>Subtotal:</Text>
                <Text>{calculateSubtotal().toFixed(2)} €</Text>
              </div>

              <div>
                <NumberInput
                  label="Shipping"
                  min={0}
                  value={form.values.shipping}
                  onChange={(value: number | string) => {
                    // Explicitly convert to number, handling potential string input
                    const numericValue =
                      typeof value === "string" ? parseFloat(value) : value;

                    // Use isNaN to ensure a valid number
                    form.setFieldValue(
                      "shipping",
                      isNaN(numericValue) ? 0 : numericValue
                    );
                  }}
                  rightSection="€"
                />
              </div>

              <div>
                <NumberInput
                  label="Tax"
                  min={0}
                  value={form.values.tax}
                  onChange={(value: number | string) => {
                    // Explicitly convert to number, handling potential string input
                    const numericValue =
                      typeof value === "string" ? parseFloat(value) : value;

                    // Use isNaN to ensure a valid number
                    form.setFieldValue(
                      "tax",
                      isNaN(numericValue) ? 0 : numericValue
                    );
                  }}
                  rightSection="€"
                />
              </div>

              <Divider my="sm" />

              <div className="flex justify-between">
                <Text fw={700}>Total:</Text>
                <Text fw={700} size="lg">
                  {calculateTotal().toFixed(2)} €
                </Text>
              </div>

              <Button fullWidth mt="xl" type="submit" loading={loading}>
                {initialData ? "Update Order" : "Create Order"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
