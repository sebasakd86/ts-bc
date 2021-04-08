import { RequestHandler } from "express";

import Todo from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const { text } = req.body;
    const newToDo = new Todo(Math.random().toString(), text);
    TODOS.push(newToDo);
    res.status(201).json({ message: "Todo created", createTodo: newToDo });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    const todo = TODOS.findIndex((t) => t.id === id);
    if (todo >= 0) {
        TODOS[todo].text = text;
        res.json({ message: "Todo Updated", updateTodo: TODOS[todo] });
    }
    throw new Error(`Todo doesn't exists`);
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const { id } = req.params;
    const todo = TODOS.findIndex((t) => t.id === id);
    if (todo >= 0) {
        TODOS.splice(todo, 1);
        res.json({ message: "Todo Deleted" });
    }
    throw new Error(`Todo doesn't exists`);
};
