import express  from  'express';

const app = express();

const db= {
    todos: []
};

app.use(express.json());

app.get('/todos', (req, res) =>{
    res.status(200).json({
        status: 'success',
        data:{
            todos: db.todos,
        },
    });
});


app.post('/todo', (req, res) => {
    const { id, name, age, city } = req.body;

    const todo = {
        id: db.todos.length + 1,
        name,
        age,
        city,
    };
    db.todos.push(todo)

    res.status(201).json({
        data: {
            message:'todo deatail created',
            todo,
        }
    })
});
// Update todo 
app.put('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, city } = req.body;
  
    const todoToUpdate = db.todos.find(todo => todo.id === id);
  
    if (!todoToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    todoToUpdate.name = name || todoToUpdate.name;
    todoToUpdate.age = age || todoToUpdate.age;
    todoToUpdate.city = city|| todoToUpdate.city;
  
  
    return res.json({ message: 'User updated successfully', todo: todoToUpdate });
  });
  

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;

    const todo = db.todos.find((todo) => todo.id == Number(id))
        
    if (!todo) {
        res.status(404).json({
            data: {
                message:'todo not found',
            },
        });
    }

    const index = db.todos.indexOf(todo);

    db.todos.splice(index, 1);
    res.status(200).json({
        data: {
            message: 'todo deleted Successfully',
        },
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});