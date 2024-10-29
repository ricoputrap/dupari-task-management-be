import ConflictError from "../../../../errors/ConflictError";
import { IUserRegistrationData } from "../../../../features/auth/schemas";
import register from "../../../../features/auth/services/register";
import userRepository from "../../../../repositories/user";

jest.mock('../../../../repositories/user'); // Mock the user repository
jest.mock('../../../../utils/passwordHashing'); // Mock the password hashing function

describe("AuthService register()", () => {
  const mockUserData: IUserRegistrationData = {
    email: 'test@example.com',
    password: 'StrongPassword123!',
    name: 'Test User'
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("the user with the same email already exists", () => {
    it("should throw a 409 conflict error", async () => {
      // Mock the user repository to return a user with the same email
      const getUserByEmail = jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockResolvedValueOnce({
          id: 1,
          name: 'Test User',
          email: mockUserData.email,
          password: ""
        });

      // test the result
      const conflictError = new ConflictError(`User with email ${mockUserData.email} already exists`);
      await expect(register(mockUserData)).rejects.toThrow(conflictError);

      // test the function call execution
      const withPassword = false;
      expect(getUserByEmail).toHaveBeenCalledWith(mockUserData.email, withPassword);
      expect(getUserByEmail).toHaveBeenCalledTimes(1);

      getUserByEmail.mockRestore();
    });
  })
})