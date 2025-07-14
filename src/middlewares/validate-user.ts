import type { NextFunction } from "express";
import { createUserSchema } from "./schemas";
import { ZodError } from "zod";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    createUserSchema.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      console.log("este erro é istancia do zod");
    }
  }
};
