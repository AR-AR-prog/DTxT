/**
 * Database Cleanup Script
 * Removes Copilot test accounts from the database
 * Run with: node scripts/cleanup-test-data.js
 */

const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'dev.db')
const db = new Database(dbPath)

function cleanupTestData() {
  // Find test accounts before deletion
  const testUsers = db.prepare(
    "SELECT id, email, fullName FROM users WHERE email LIKE 'copilot-%' OR fullName = 'Copilot Debug'"
  ).all()

  console.log(`Found ${testUsers.length} test accounts to remove:`)
  testUsers.forEach(u => console.log(`  - ${u.email} (${u.fullName})`))

  if (testUsers.length === 0) {
    console.log('No test accounts found. Database is clean.')
    return
  }

  // Delete test accounts
  const result = db.prepare(
    "DELETE FROM users WHERE email LIKE 'copilot-%' OR fullName = 'Copilot Debug'"
  ).run()

  console.log(`\nDeleted ${result.changes} test accounts successfully.`)

  // Verify remaining users
  const remaining = db.prepare('SELECT id, email, fullName FROM users').all()
  console.log(`\nRemaining legitimate users (${remaining.length}):`)
  remaining.forEach(u => console.log(`  - ${u.email} (${u.fullName})`))
}

try {
  cleanupTestData()
} catch (err) {
  console.error('Cleanup failed:', err)
} finally {
  db.close()
}
