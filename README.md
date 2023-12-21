# Todo List API Documentation
## End Points

### GET REQUESTS
* Get all todoLists - /todos
* Get a todo by id - /todos/:todo_id

### POST, PUT, DELETE REQUESTS
* Create a todo [POST] - /todos with payload {description: "something to do"}
* Update a todo [PUT] - /todos with payload {todo_id: todoid, description: "something to do"}
* Delete a todo [DELETE] - /todos with payload {todo_id: todoid}