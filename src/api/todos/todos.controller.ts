import { NextFunction, Request, Response } from "express";
import { Todo, TodoWithId, Todos } from "./todos.model";
import { ObjectId } from "mongodb";
import { ZodError } from "zod";
import { paramsWitId, paramsWithId } from "../../interfaces/paramsWithId";

export async function getAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction) {
    try {
        const result = await Todos.find()
        const todos = await result.toArray()
        return res.status(200).json(todos)
    } catch (err: any) {
        return next(err)
    }
}

export async function getById(req: Request<paramsWitId, TodoWithId, {}>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const { id } = req.params
        const result = await Todos.findOne({ _id: new ObjectId(req.params.id) })
        if (!result) {
            res.status(404)
            throw new Error(`No todo found with id: ${id}`)
        }
        return res.status(200).json(result)
    } catch (err: any) {
        return next(err)
    }
}

export async function createTodo(req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const todo = await Todos.insertOne(req.body)
        if (!todo.acknowledged) {
            throw new Error('Error creating todo')
        }
        return res.status(201).json({
            _id: todo.insertedId,
            ...req.body
        })
    } catch (err: any) {
        if (err instanceof ZodError) {
            res.status(422)//unprocessable data
        }
        return next(err)
    }
}

export async function updateTodo(req: Request<paramsWitId, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const updatedTodo = await Todos.findOneAndUpdate({ _id: new ObjectId(req.params.id) }, { "$set": req.body }, { returnDocument: 'after' })
        if (!updatedTodo) {
            throw new Error('Error updating todo')
        }
        return res.status(200).json(updatedTodo)
    } catch (err: any) {
        if (err instanceof ZodError) {
            res.status(422)//unprocessable data
        }
        return next(err)
    }
}

export async function deleteTodo(req: Request<paramsWitId>, res: Response, next: NextFunction) {
    try {
        const deletedTodo = await Todos.findOneAndDelete({ _id: new ObjectId(req.params.id) })
        if (!deletedTodo) {
            throw new Error("Error deleting todo")
        }
        return res.status(200).json(deletedTodo)
    } catch (err: any) {
        if (err instanceof ZodError) {
            res.status(422)
        }
        return next(err)
    }
}
