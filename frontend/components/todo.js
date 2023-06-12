import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./button";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      alert("Mohon isi judul dan deskripsi");
      return;
    }

    if (editId) {
      const updatedTodo = { title, desc };
      axios
        .put(`http://localhost:5000/todos/${editId}`, updatedTodo)
        .then(() => {
          setEditId(null);
          setTitle("");
          setDesc("");
          fetchTodos();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newTodo = { title, desc };
      axios
        .post("http://localhost:5000/todos", newTodo)
        .then(() => {
          setTitle("");
          setDesc("");
          fetchTodos();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      setTitle(todo.title);
      setDesc(todo.desc);
    } else {
      setTitle("");
      setDesc("");
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAll = () => {
    axios
      .delete("http://localhost:5000/todos")
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTodos = () => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center m-[30px]">
      <h1 className="text-[30px] text-center font-bold">Todos</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-[14px] mt-[15px]"
      >
        <div className="flex flex-row items-center justify-center gap-[14px]">
          <h4 className="text-[20px]">Judul</h4>
          <input
            type="text"
            className="ring-[2px] ring-inset ring-cyan-500 p-[5px] rounded-lg ml-[33px]"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            id="title"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-[14px]">
          <h4 className="text-[20px]">Deskripsi</h4>
          <input
            type="text"
            className="ring-[2px] ring-inset ring-cyan-500 p-[5px] rounded-lg"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            value={desc}
            id="desc"
          />
        </div>
        <Button type={editId ? "Edit" : "Add"} className="mx-auto mt-[2px]" />
      </form>

      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex flex-row items-start justify-between w-[500px] bg-slate-300 rounded-xl py-[10px] px-[20px] mt-[15px]"
        >
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-[20px]">{todo.title}</h1>
            <h1 className="text-[16px]">{todo.desc}</h1>
          </div>
          <div className="flex flex-row items-start justify-start gap-[10px]">
            {!editId && (
              <Button type="Edit" onClick={() => handleEdit(todo._id)} />
            )}
            <Button type="Delete" onClick={() => handleDelete(todo._id)} />
          </div>
        </div>
      ))}

      {todos.length > 0 && (
        <Button type="Delete All" onClick={handleDeleteAll} />
      )}
    </div>
  );
}
