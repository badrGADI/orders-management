const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.product.deleteMany({});

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+33 123456789",
        address: "123 Main St, Paris, France",
      },
    }),

    prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+33 123456789",
        address: "123 Main St, Paris, France",
      },
    }),
    prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+33 123456789",
        address: "123 Main St, Paris, France",
      },
    }),
    prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+33 123456789",
        address: "123 Main St, Paris, France",
      },
    }),
    prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+33 123456789",
        address: "123 Main St, Paris, France",
      },
    }),

    prisma.customer.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+33 987654321",
        address: "456 Oak Ave, Lyon, France",
      },
    }),
    prisma.customer.create({
      data: {
        name: "Robert Johnson",
        email: "robert@example.com",
        phone: "+33 456789123",
        address: "789 Pine Rd, Marseille, France",
      },
    }),
  ]);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Laptop",
        description: "High-performance laptop with 16GB RAM",
        price: 1299.99,
        stock: 50,
      },
    }),
    prisma.product.create({
      data: {
        name: "Smartphone",
        description: "Latest model with 128GB storage",
        price: 899.99,
        stock: 100,
      },
    }),
    prisma.product.create({
      data: {
        name: "Headphones",
        description: "Noise-cancelling wireless headphones",
        price: 249.99,
        stock: 200,
      },
    }),
    prisma.product.create({
      data: {
        name: "Tablet",
        description: "10-inch tablet with 64GB storage",
        price: 499.99,
        stock: 75,
      },
    }),
    prisma.product.create({
      data: {
        name: "Smartwatch",
        description: "Fitness tracking and notifications",
        price: 199.99,
        stock: 150,
      },
    }),
  ]);

  // Create orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        reference: "ORD-001",
        status: "delivered",
        subtotal: 1299.99,
        tax: 260.0,
        shipping: 15.0,
        totalAmount: 1574.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 1299.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-01101",
        status: "delivered",
        subtotal: 1299.99,
        tax: 260.0,
        shipping: 15.0,
        totalAmount: 1574.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 1299.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-011901",
        status: "delivered",
        subtotal: 1299.99,
        tax: 260.0,
        shipping: 15.0,
        totalAmount: 1574.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 1299.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-01801",
        status: "delivered",
        subtotal: 1299.99,
        tax: 260.0,
        shipping: 15.0,
        totalAmount: 1574.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 1299.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-0801",
        status: "delivered",
        subtotal: 1299.99,
        tax: 260.0,
        shipping: 15.0,
        totalAmount: 1574.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 1299.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-01101",
        status: "delivered",
        subtotal: 1299.99,
        tax: 260.0,
        shipping: 15.0,
        totalAmount: 1574.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 1299.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-01201",
        status: "delivered",
        subtotal: 1299.99,
        tax: 260.0,
        shipping: 15.0,
        totalAmount: 1574.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 1299.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-0011",
        status: "delivered",
        subtotal: 1299.99,
        tax: 260.0,
        shipping: 15.0,
        totalAmount: 1574.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 1299.99,
              productId: products[0].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-002",
        status: "processing",
        subtotal: 1149.98,
        tax: 230.0,
        shipping: 15.0,
        totalAmount: 1394.98,
        customerId: customers[1].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 899.99,
              productId: products[1].id,
            },
            {
              quantity: 1,
              unitPrice: 249.99,
              productId: products[2].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-003",
        status: "new",
        subtotal: 699.98,
        tax: 140.0,
        shipping: 10.0,
        totalAmount: 849.98,
        customerId: customers[2].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 499.99,
              productId: products[3].id,
            },
            {
              quantity: 1,
              unitPrice: 199.99,
              productId: products[4].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-004",
        status: "shipped",
        subtotal: 899.99,
        tax: 180.0,
        shipping: 15.0,
        totalAmount: 1094.99,
        customerId: customers[0].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 899.99,
              productId: products[1].id,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        reference: "ORD-005",
        status: "cancelled",
        subtotal: 249.99,
        tax: 50.0,
        shipping: 10.0,
        totalAmount: 309.99,
        customerId: customers[1].id,
        items: {
          create: [
            {
              quantity: 1,
              unitPrice: 249.99,
              productId: products[2].id,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`Seeded ${customers.length} customers`);
  console.log(`Seeded ${products.length} products`);
  console.log(`Seeded ${orders.length} orders`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
