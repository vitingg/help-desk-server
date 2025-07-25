import { Request, Response } from "express";

export function changePasswordController(req: Request, res: Response) {
  const { password } = req.body
  
  // Passar pro service responsável
}
