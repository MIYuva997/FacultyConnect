const { pool } = require('./src/config/database');

async function inspectTable() {
    try {
        const dbInfo = await pool.query('SELECT current_database(), current_schema()');
        console.log('--- DB Info ---');
        console.log(`Database: ${dbInfo.rows[0].current_database}`);
        console.log(`Schema: ${dbInfo.rows[0].current_schema}`);

        const findUser = await pool.query(`
            SELECT schemaname, tablename 
            FROM pg_tables 
            WHERE tablename = 'users'
        `);
        console.log('--- "users" table locations ---');
        findUser.rows.forEach(row => {
            console.log(`${row.schemaname}.${row.tablename}`);
        });

        if (findUser.rows.length > 0) {
            const schema = findUser.rows[0].schemaname;
            const cols = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'users' AND table_schema = $1
            `, [schema]);
            console.log(`--- Columns in "${schema}.users" table ---`);
            cols.rows.forEach(row => {
                console.log(`${row.column_name}: ${row.data_type}`);
            });
        }
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting table:', err);
        process.exit(1);
    }
}

inspectTable();
