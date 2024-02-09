import express from 'express';
import todoRouter from "./todos/todos.routes"

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/todos', todoRouter);

export default router;
