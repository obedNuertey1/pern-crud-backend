import pg from "pg";
const Pool = pg.Pool;

export default new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "todo_list"
});