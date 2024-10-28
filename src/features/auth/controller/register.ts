import { Request, Response } from "express";
import { handleSchemaValidationError, validateData } from "../../../utils/validations";
import { IUserRegistrationData, userRegistrationSchema } from "../schemas";
import { errorHandler, sendResponse } from "../../../utils/http";
import authService from "../services";
import { EnumHttpStatus } from "../../../configs/enums";

const LOG_PREFIX = '[AUTH] /register';

/**
 * Handles the registration of a new user.
 * 
 * Validates the incoming request data against the user registration schema.
 * If validation fails, it sends a response with validation errors.
 * If validation succeeds, it delegates the user creation process to the authService.
 * Responds with the result of the user creation process, including status and message.
 * In case of any errors during the process, an appropriate error response is sent.
 * 
 * @param req - The Express request object containing user registration data.
 * @param res - The Express response object used to send responses to the client.
 */
const register = async (req: Request, res: Response) => {
  try {
    const validationResult = validateData<IUserRegistrationData>(
      req.body,
      userRegistrationSchema,
    );

    // validation error
    if (!validationResult.success) {
      return handleSchemaValidationError(
        res,
        validationResult.errors || [],
        LOG_PREFIX
      );
    }

    // create user
    const result = await authService.register(validationResult.data!);

    sendResponse({
      res,
      status: EnumHttpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: result
    });
  }
  catch (error: any) {
    errorHandler(error, res, LOG_PREFIX);
  }
}

export default register;