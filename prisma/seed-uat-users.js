require('dotenv/config')
const { PrismaClient } = require('@prisma/client')
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
const bcrypt = require('bcryptjs')

const url = process.env.DATABASE_URL ?? 'file:./dev.db'
const adapter = new PrismaBetterSqlite3({ url })
const prisma = new PrismaClient({ adapter })

const EMAILS = [
  'reymsam3@gmail.com',
  'turweljrrocky@gmail.com',
  'jnllemaye@gmail.com',
  'sdfgsdfg@gmail.com',
  'cjsambat07@gmail.com',
  'colengstra@gmail.com',
  'lepetitprince052507@gmail.com',
  'hopiaa.tulauan123@gmail.com',
  'jamaicalucas38@gmail.com',
  'oainsleyjea@gmail.com',
  'bjulianaaleina@gmail.com',
  'patrickdaniellemanueltomas@gmail.com',
  'clydedominick09@gmail.com',
  'lorenzododger@gmail.com',
  'flarkien01@gmail.com',
  'k1ngr4tar@gmail.com',
]

const PASSWORD = 'astaYUNO1!'

async function main() {
  console.log('Creating UAT user accounts...\n')

  const passwordHash = await bcrypt.hash(PASSWORD, 12)

  let created = 0
  let skipped = 0

  for (const email of EMAILS) {
    const existing = await prisma.user.findUnique({ where: { email } })

    if (existing) {
      console.log(`⚠️  Skipped (already exists): ${email}`)
      skipped++
      continue
    }

    const namePart = email.split('@')[0].replace(/[^a-zA-Z\s]/g, ' ').trim()
    const fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1) || email

    await prisma.user.create({
      data: {
        email,
        fullName,
        passwordHash,
        apiUsageCount: 0,
        apiUsageLimit: 50,
      },
    })

    console.log(`✅ Created: ${email}`)
    created++
  }

  console.log(`\nDone! ${created} created, ${skipped} skipped.`)
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
