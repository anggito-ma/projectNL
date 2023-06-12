const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost/todo-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/todos", (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.post("/todos", (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    desc: req.body.desc,
  });

  newTodo
    .save()
    .then(() => res.json("Todo added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.delete("/todos/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.delete("/todos", (req, res) => {
  Todo.deleteMany({})
    .then(() => res.json("All todos deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
