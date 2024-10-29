import ConflictError from "../../../../errors/ConflictError";
import { IUserRegistrationData } from "../../../../features/auth/schemas";
import register from "../../../../features/auth/services/register";
import userRepository from "../../../../repositories/user";
import { hashPassword } from "../../../../utils/passwordHashing";

jest.mock('../../../../utils/passwordHashing');

describe("AuthService register()", () => {
  const mockUserData: IUserRegistrationData = {
    email: 'test@example.com',
    password: 'StrongPassword123!',
    name: 'Test User'
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("given the user with the same email already exists", () => {
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
  });

  describe("given the user with the same email does not exist", () => {
    it("should successfully create a new user and return it", async () => {
      // Mock the getUserByEmail() to return undefined
      const getUserByEmail = jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockResolvedValueOnce(undefined);

      // Mock the hashPassword() to return a hashed password
      (hashPassword as jest.Mock).mockResolvedValueOnce(mockUserData.password);

      // Mock the createUser() to return a new user
      const userID = 1;
      const createUser = jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValueOnce({
          id: userID,
          name: mockUserData.name,
          email: mockUserData.email
        });

      // test the result
      const result = await register(mockUserData);
      expect(result).toEqual({
        id: userID,
        name: mockUserData.name,
        email: mockUserData.email
      });

      // test the getUserByEmail() function call execution
      const withPassword = false;
      expect(getUserByEmail).toHaveBeenCalledWith(mockUserData.email, withPassword);
      expect(getUserByEmail).toHaveBeenCalledTimes(1);

      // test the hashPassword() function call execution
      expect(hashPassword).toHaveBeenCalledWith(mockUserData.password);
      expect(hashPassword).toHaveBeenCalledTimes(1);

      // test the createUser() function call execution
      expect(createUser).toHaveBeenCalledWith({
        ...mockUserData,
        password: mockUserData.password
      });
      expect(createUser).toHaveBeenCalledTimes(1);

      // clean up mocks
      getUserByEmail.mockRestore();
      createUser.mockRestore();
    });
  })
})