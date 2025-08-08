import { Request, Response } from "express";
import { userServices } from "@src/services/user-service";
import { AuthenticatedRequest } from "@src/middlewares/authorize";

export async function changePasswordController(
  req: AuthenticatedRequest,
  res: Response
) {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400).json({ message: "Invalid Credentials" });
  }
  const userIdFromToken = req.user?.userId;

  if (!userIdFromToken) {
    res.status(400).json({ message: "No users informed!" });
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
