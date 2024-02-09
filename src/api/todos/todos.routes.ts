import { Router } from "express";
import * as TodoHandler from "./todos.controller"
import { RequestValidator } from "./todo.middleware";
import { Todo, TodoBody } from "./todos.model";
import { paramsWithId } from "../../interfaces/paramsWithId";

const todoRouter = Router()

todoRouter.get('/', TodoHandler.getAll)
todoRouter.get('/:id', RequestValidator({ params: paramsWithId }), TodoHandler.getById)
todoRouter.post('/', RequestValidator({ body: Todo }), TodoHandler.createTodo)
todoRouter.put('/:id', RequestValidator({ params: paramsWithId, body: TodoBody }), TodoHandler.updateTodo)
todoRouter.delete("/:id", RequestValidator({ params: paramsWithId }), TodoHandler.deleteTodo)


export default todoRouter
