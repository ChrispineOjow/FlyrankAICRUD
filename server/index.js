import express from "express";

const PORT = 5000;
const app = express();

app.use(express.json());

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



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});