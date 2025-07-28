import { Request, Response } from "express";
import { userServices } from "../../service/user-service";

export function changePasswordController(req: Request, res: Response) {
  const { oldPassword, newPassword } = req.body;
  const userId = req.body.id;

  if (!oldPassword || !newPassword) {
    throw new Error("Invalid Credentials");
  }

  if (!userId) {
    throw new Error("No users informed!");
  }

  try {
    const user = userServices.changePassword({
      oldPassword,
      newPassword,
      userId,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in change password", error });
  }
}
