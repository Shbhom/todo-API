import { WithId } from "mongodb"
import * as z from "zod"
import { db } from "../../db"

export const Todo = z.object({
    content: z.string().min(1),
    done: z.boolean().default(false)
})

export const TodoBody = z.object({
    content: z.string().min(1).optional(),
    done: z.boolean().optional()
})

export type Todo = z.infer<typeof Todo>
export type TodoWithId = WithId<Todo>
export type TodoBody = WithId<typeof TodoBody>
export const Todos = db.collection<Todo>('todos')