import { Todo } from "./todos.model"
import { Response, Request, NextFunction } from "express"
import * as z from "zod"
import { ZodError } from "zod"
import { updateTodo } from "./todos.controller"
import requestValidator from "../../interfaces/requestValidator"


type requestInput = {
    content?: string,
    done?: boolean
}

const createSchema = z.object({
    content: z.string().min(1),
    done: z.boolean().optional()
})
const updateSchema = z.object({
    content: z.string().min(1).optional(),
    done: z.boolean().optional()
})

export function RequestValidator(request: requestValidator) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (request.params) {
                req.params = await request.params.parseAsync(req.params)
            }
            if (request.body) {
                req.body = await request.body.parseAsync(req.body)
            }
            if (request.query) {
                req.query = await request.query.parseAsync(req.query)
            }
            return next()
        } catch (err: any) {
            if (err instanceof ZodError) {
                res.status(422);
            }
            return next(err);
        }
    }
}
