import { Request, Response } from "express";
import { userServices } from "@src/service/user-service"; 
import { AuthenticatedRequest } from "@src/middlewares/authorize"; 

export async function changePasswordController(
  req: AuthenticatedRequest,
  res: Response
) {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error("Invalid Credentials");
  }
  const userIdFromToken = req.user?.userId;

  if (!userIdFromToken) {
    throw new Error("No users informed!");
  }

  try {
    const user = await userServices.changePassword({
      oldPassword,
      newPassword,
      userIdFromToken,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in change password", error });
  }
}
