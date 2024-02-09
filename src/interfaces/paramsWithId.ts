import { ObjectId } from "mongodb"
import * as z from "zod"

export type paramsWitId = z.infer<typeof paramsWithId>

export const paramsWithId = z.object({
    id: z.string().min(1).refine((val) => {
        try {
            return new ObjectId(val)
        } catch (err: any) {
            return false
        }
    }, {
        message: "Invalid ObjectId"
    })
})