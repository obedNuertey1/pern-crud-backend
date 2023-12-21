"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
exports.default = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "todo_list"
});
