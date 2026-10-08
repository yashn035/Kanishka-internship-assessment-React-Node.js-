const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing tables
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});

  const adminPasswordHash = await bcrypt.hash('Admin123!', 10);
  const userPasswordHash = await bcrypt.hash('User123!', 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@kanishka.com',
      password: adminPasswordHash,
      role: 'admin'
    }
  });

  // Create Regular User 1
  const john = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: userPasswordHash,
      role: 'user'
    }
  });

  // Create Regular User 2
  const jane = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: userPasswordHash,
      role: 'user'
    }
  });

  console.log('✅ Created users:');
  console.log(` - Admin: ${admin.email}`);
  console.log(` - User 1: ${john.email}`);
  console.log(` - User 2: ${jane.email}`);

  // Create Seed Tasks
  const task1 = await prisma.task.create({
    data: {
      user_id: john.id,
      title: 'Setup Initial Project Boilerplate',
      description: 'Initialize Express app with Prisma ORM and SQLite configuration.',
      status: 'Completed'
    }
  });

  const task2 = await prisma.task.create({
    data: {
      user_id: john.id,
      title: 'Implement JWT Authentication Middleware',
      description: 'Protect API endpoints with Bearer token authentication logic.',
      status: 'In Progress'
    }
  });

  const task3 = await prisma.task.create({
    data: {
      user_id: jane.id,
      title: 'Write Unit Tests for User Registration',
      description: 'Cover edge cases for duplicate emails and password hashing validation.',
      status: 'Pending'
    }
  });

  const task4 = await prisma.task.create({
    data: {
      user_id: admin.id,
      title: 'Review System Architecture & Security Headers',
      description: 'Audit role-based authorization scopes and environment variable handling.',
      status: 'Testing'
    }
  });

  console.log(`✅ Created ${4} initial seed tasks.`);
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
