const { PrismaClient } = require('@prisma/client')
// Use bcryptjs since it's mentioned in the stack
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding UAT users...')

  // Clean the database (Optional but good for a fresh UAT env)
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash('Password123!', 10)

  // 1. Regular active user
  const activeUser = await prisma.user.create({
    data: {
      email: 'uat-user@example.com',
      fullName: 'UAT Active Tester',
      passwordHash,
      apiUsageCount: 5,
      apiUsageLimit: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  console.log(`Created Active Tester: ${activeUser.email}`)

  // 2. User who has exhausted their limits
  const maxedUser = await prisma.user.create({
    data: {
      email: 'uat-maxed@example.com',
      fullName: 'UAT Limit Tester',
      passwordHash,
      apiUsageCount: 50,
      apiUsageLimit: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  console.log(`Created Maxed Limit Tester: ${maxedUser.email}`)

  // 3. Brand new user (0 usage)
  const newUser = await prisma.user.create({
    data: {
      email: 'uat-new@example.com',
      fullName: 'UAT New User',
      passwordHash,
      apiUsageCount: 0,
      apiUsageLimit: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  console.log(`Created New User: ${newUser.email}`)

  console.log('UAT Database seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
