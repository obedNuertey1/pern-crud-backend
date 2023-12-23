import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import Pool from './db';
import bodyParser from 'body-parser';
config();
const app = express();


// Middleware
app.use(cors({optionsSuccessStatus: 200}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES //
// Create a todo
app.route('/todos').post(async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await Pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);
        
        if(newTodo.rows[0]){
            res.json( { created_todo: true } );
        }else{
            res.json( { created_todo: false } );
        }

    } catch (e) {
        console.error(e.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get all todos
app.route('/todos').get(async (req:express.Request, res:express.Response)=>{
    try{
        const getTodos = await Pool.query('SELECT * FROM todo ORDER BY todo_id DESC');
        console.log(req.body);// logs {}
 
        if(getTodos.rows){
            res.json(getTodos.rows);
        }else{
            res.json(null)
        }
    }catch(e){
        console.error(e.stack);
        res.status(404).json({error: `${e.message}`});
    }
});

// get a todo by an id
app.route('/todos/:id').get(async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const query = await Pool.query("SELECT * FROM todo WHERE todo_id=($1)", [id]);
        console.log(query.rows[0]);
        if(query.rows[0]){
            res.json(query.rows[0]);
        }else{
            res.json(null);
        }

    }catch(e){
        console.error(e.stack);
        res.status(404).json({error: `${e.message}`});
    }
});

// update a todo
app.route('/todos').put(async (req:express.Request, res:express.Response)=>{

    try{

        const { todo_id, description } = req.body;
        let updateTodo = {
            query: "UPDATE todo SET description = $2 WHERE todo_id =$1",
            values: [todo_id, description]
        }
        const query = await Pool.query( updateTodo.query, updateTodo.values );
        console.log( query.rows );
        
        // respond with true if updated
        if(query){
            res.json({updated: true});
        }else{
            res.json({updated: false});
        }

    }catch(e){
        console.error(e.stack);
        res.status(404).json({error: `${e.message}`});
    }
});

// delete a todo
app.route('/todos').delete(async (req:express.Request, res:express.Response)=>{

    try{
        const { todo_id } = req.body;
        const query = await Pool.query('DELETE FROM todo WHERE todo_id = $1', [todo_id]);
        if(query){
            res.json({deleted: true});
        }else{
            res.json({deleted: false});
        }
    }catch(e){
        console.error(e.stack);
        res.status(404).json({error: `${e.message}`});
    }
});


// Host app on a specific port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on Port=${port}`);
});
