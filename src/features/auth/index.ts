import { Router } from 'express';
import { EnumHttpStatus } from '../../configs/enums';

const authRouter = Router();

authRouter.post("/register", (req, res) => {
  // read the request body
  console.log(req.body);
  res.send({
    success: true,
    status: EnumHttpStatus.OK,
    message: "User registered successfully",
  });
});

export default authRouter;