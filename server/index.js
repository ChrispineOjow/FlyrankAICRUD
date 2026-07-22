import express from "express";

const PORT = 5000;
const app = express();

app.get("/", (req, res)=> {
    try{
    res.send("Hello Server");
    }catch(error){
        console.log("Error ", error.message);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});