import { z } from 'zod';
import { Response } from 'express';

export const handleError = (res: Response, err: any) => {
  console.log(err);
  if (err instanceof z.ZodError) {
    return res.status(400).json({ response: err.errors[0].message });
  }
  return res
    .status(500)
    .json({ response: 'Ha ocurrido un error en el servidor' });
};
