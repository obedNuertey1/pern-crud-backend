"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const body_parser_1 = __importDefault(require("body-parser"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ optionsSuccessStatus: 200 }));
app.route('/todos').post(async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await db_1.default.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);
        console.log(req.body);
        res.json(newTodo.rows[0]);
    }
    catch (e) {
        console.error(e.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on Port=${port}`);
});
