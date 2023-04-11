const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const storage = require("node-persist");
const init = async () => {
  await storage.init({ dir: "./list" });   //storage.init() method specifies the directory where the data will be stored
};
init();
// Thus, node-persist storage module is initialized with the specified directory for storing data for my todo list app.


  app.get("/todo", async (req, res) => {
    const itemLists = await storage.getItem("list");
    res.status(200).json({ result: itemLists });
  });



  app.post("/todo", async (req, res) => {
    const alltodo = await storage.getItem("list");
    const todo = req.body;
    todo.id = alltodo ? alltodo.length + 1 : 1;
    const newTodo = alltodo ? [...alltodo, todo] : [todo];
    await storage.setItem("list", newTodo);
    res.status(200).json({ success: true });
  });
   
  app.delete("/todo", async (req, res) => {
    await storage.clear(); //On restarting the application, the old node persist data will be deleted
    res.status(200).json({ success: true });//Used storage.clear() as per the requirements
  });
  
  app.listen(8081, () => {
    console.log('Server started on port 8081');
  });
