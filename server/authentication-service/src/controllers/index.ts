import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import User from '../models/userModel';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

export default router;
