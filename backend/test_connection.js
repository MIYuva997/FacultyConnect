// Test PostgreSQL Connection
// Run this with: node test_connection.js

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

console.log('Testing PostgreSQL connection...');
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Port: ${process.env.DB_PORT}`);
console.log(`Database: ${process.env.DB_NAME}`);
console.log(`User: ${process.env.DB_USER}`);
console.log(`Password: ${process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-2) : 'NOT SET'}`);
console.log('');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Connection failed!');
        console.error('Error:', err.message);
        console.error('');
        console.error('Common solutions:');
        console.error('1. Check if PostgreSQL service is running');
        console.error('2. Verify password in .env file matches pgAdmin password');
        console.error('3. Try these common passwords: postgres, admin, root, or blank');
        process.exit(1);
    } else {
        console.log('✅ Connection successful!');
        console.log('Server time:', res.rows[0].now);
        pool.end();
        process.exit(0);
    }
});
