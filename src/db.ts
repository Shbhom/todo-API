import { MongoClient } from "mongodb";
import "dotenv/config"


const { MONGO_URI = "mongodb+srv://root:5L8rFu97q3kWM723@ecommerce-cluster.zyhkwv3.mongodb.net/?retryWrites=true&w=majority" } = process.env

const client = new MongoClient(MONGO_URI as string)
export const db = client.db()