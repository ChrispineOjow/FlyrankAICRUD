import express from "express";

const PORT = 5000;
const app = express();

app.use(express.json());

//In Memory "database" pre-filled with 3 example tasks

let tasks = [
    {id: 1, title: "Intern with FlyRank AI", done: true},
    {id: 2, title: "Build a task API", done: false},
    {id: 3, title: "Get a job", done: false}
];

//Root endpoint
app.get("/", (req, res)=> {
    res.json({

        "name": "Task API",
        "version":"1.0",
        "endpoints":["/tasks"]
    })
})


app.get("/health", (req, res)=> {
    res.json({
        "status": "OK"
    })
})

//return all tasks
app.get("/tasks", (req, res)=> {
    try{
        res.json(tasks)
    }catch(error){
        res.status(error.message)
    }
})

//return a single task by id
app.get("/tasks/:id", (req, res)=>{
    try{

        const taskId = parseInt(req.params.id);
        const task = tasks.find(t => t.id === taskId);

        if(!task){
            res.status(404).json ({error: `Task ${taskId} not found`, message: error.message});
        }

        res.status(200).json(task);

    }catch(error){

        res.status(500).json({error: "Internal Server Error"});

    }
})

//Add a new task
app.post("/tasks", (req, res)=> {
    try{

        const {title} = req.body;

        if(!title || title.trim() === ""){
            return res.status(400).json({error: "Title is required"});
        }

        const nextId = tasks.length > 0 ? Math.max( ...tasks.map(t=> t.id))+1 : 1;

        const newTask = {
            id: nextId,
            title: title.trim(),
            done: false
        }

        tasks.push(newTask);

        res.status(201).json(newTask);

    }catch(error){

        res.status(500).json({error: "Internal Server Error"});

    }
})

//Update a task by id
app.put("/tasks/:id", (req, res)=> {
    try{

        const taskId = parseInt(req.params.id);
        const task = tasks.find(t => t.id === taskId);

        if(!task){
            return res.status(404).json({error: `Task ${taskId} not found`});

        }

        const {title, done } = req.body;

        if(title !== undefined){
            if (typeof title !== "string" || title.trim() === ""){
                return res.status(400).json({error: "Title cannot be empty"});
            }
            task.title = title.trim();
        }

        if(done !== undefined){
            task.done = done;
        }

        res.status(200).json(task);

    }catch(error){
        
        res.status(500).json({error: "Internal Server Error"});

    }
})

//Delete a task by id
app.delete("/tasks/:id", (req, res)=> {
    try{

        const taskId = parseInt(req.params.id, 10);
        const task = tasks.find(t => t.id === taskId);

        if(!task){
            return res.status(404).json({error: `Task ${taskId} not found`});
        }

        tasks = tasks.filter(t => t.id !== taskId);
        res.status(200).json({
            message: `Task ${taskId} deleted successfully`,
            deletedTask: task
        });



    }catch(error){

        res.status(500).json({error: "Internal Server Error"});
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});