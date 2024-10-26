import { Router } from 'express';
import { EnumHttpStatus } from '../../configs/enums';
import { validateData } from '../../utils/validations';
import { IUserRegistrationData, userRegistrationSchema } from './schemas';
import { errorHandler, sendResponse } from '../../utils/http';
import authService from './services';

const LOG_PREFIX = '[AUTH] ';
const authRouter = Router();

const logPrefix = `${LOG_PREFIX} /register`;

authRouter.post("/register", async (req, res) => {
  try {
    const userData = validateData<IUserRegistrationData>(
      res,
      req.body,
      userRegistrationSchema,
      "register"
    );

    if (!userData) return;

    const result = await authService.register(userData);

    sendResponse({
      res,
      status: result.status,
      success: result.success,
      message: result.message,
      data: result.data
    });
  }
  catch (error) {
    errorHandler(error, res, logPrefix);
  }
});

export default authRouter;
