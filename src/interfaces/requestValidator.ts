import { AnyZodObject } from "zod"

export default interface requestValidator {
    params?: AnyZodObject
    body?: AnyZodObject
    query?: AnyZodObject
}