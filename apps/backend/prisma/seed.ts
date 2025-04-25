const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.product.deleteMany({});

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

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const orders = [];
  for (let i = 1; i <= 115; i++) {
    const selectedProducts = [getRandom(products), getRandom(products)];
    const items = selectedProducts.map((product) => ({
      quantity: Math.ceil(Math.random() * 2),
      unitPrice: product.price,
      productId: product.id,
    }));

    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const tax = parseFloat((subtotal * 0.2).toFixed(2));
    const shipping = 10 + Math.random() * 10;
    const totalAmount = subtotal + tax + shipping;

    const order = await prisma.order.create({
      data: {
        reference: `ORD-${String(i).padStart(3, "0")}`,
        status: getRandom([
          "new",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
        ]),
        subtotal,
        tax,
        shipping,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        customerId: getRandom(customers).id,
        items: { create: items },
      },
    });

    orders.push(order);
  }

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
