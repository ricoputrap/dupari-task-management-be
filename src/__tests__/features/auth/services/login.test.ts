import NotFoundError from "../../../../errors/NotFoundError";
import UnauthorizedError from "../../../../errors/UnauthorizedError";
import { IUserLoginData } from "../../../../features/auth/schemas";
import authService from "../../../../features/auth/services";
import userRepository from "../../../../repositories/user";
import { hashPassword } from "../../../../utils/passwordHashing";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/token";

jest.mock('../../../../utils/passwordHashing');
jest.mock('../../../../utils/token');

describe("AuthService login()", () => {
  const mockUserData: IUserLoginData = {
    email: 'test@example.com',
    password: 'StrongPassword123!',
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("given the user does not exist", () => {
    it("should throw a 404 not found error", async () => {
      // mock the getUserByEmail() to return undefined
      const getUserByEmail = jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockResolvedValueOnce(undefined);

      // test the result
      const notFoundError = new NotFoundError(`User with email ${mockUserData.email} not found`);
      await expect(authService.login(mockUserData)).rejects.toThrow(notFoundError);

      // test the function call execution
      const withPassword = true;
      expect(getUserByEmail).toHaveBeenCalledWith(mockUserData.email, withPassword);
      expect(getUserByEmail).toHaveBeenCalledTimes(1);

      // clean up mocks
      getUserByEmail.mockRestore();
    });
  });

  describe("given the password is incorrect", () => {
    it("should throw a 401 unauthorized error", async () => {
      // mock the getUserByEmail() to return a user
      const getUserByEmail = jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockResolvedValueOnce({
          ...mockUserData,
          id: 1,
          name: 'John Doe',
        });

      // mock the hashPassword() to return a different hashed password
      (hashPassword as jest.Mock).mockResolvedValueOnce("DIFFERENT_PASSWORD");

      // test the result
      const unauthorizedError = new UnauthorizedError('Password is incorrect');
      await expect(authService.login(mockUserData)).rejects.toThrow(unauthorizedError);

      // test the getUserByEmail() function call execution
      const withPassword = true;
      expect(getUserByEmail).toHaveBeenCalledWith(mockUserData.email, withPassword);
      expect(getUserByEmail).toHaveBeenCalledTimes(1);

      // test the hashPassword() function call execution
      expect(hashPassword).toHaveBeenCalledWith(mockUserData.password);
      expect(hashPassword).toHaveBeenCalledTimes(1);

      // clean up mocks
      getUserByEmail.mockRestore();
    });
  });

  describe("given the user exists and the password is correct", () => {
    it("should return an access and refresh token", async () => {
      // mock the getUserByEmail() to return a user
      const getUserByEmail = jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockResolvedValueOnce({
          ...mockUserData,
          id: 1,
          name: 'John Doe',
        });

      // mock the hashPassword() to return a hashed password
      (hashPassword as jest.Mock).mockResolvedValueOnce(mockUserData.password);

      // mock the generateAccessToken() to return an access token
      (generateAccessToken as jest.Mock).mockReturnValueOnce('ACCESS_TOKEN');

      // mock the generateRefreshToken() to return a refresh token
      (generateRefreshToken as jest.Mock).mockReturnValueOnce('REFRESH_TOKEN');

      // test the result
      const result = await authService.login(mockUserData);
      expect(result).toEqual({
        accessToken: 'ACCESS_TOKEN',
        refreshToken: 'REFRESH_TOKEN'
      });

      // test the getUserByEmail() function call execution
      const withPassword = true;
      expect(getUserByEmail).toHaveBeenCalledWith(mockUserData.email, withPassword);
      expect(getUserByEmail).toHaveBeenCalledTimes(1);

      // test the hashPassword() function call execution
      expect(hashPassword).toHaveBeenCalledWith(mockUserData.password);
      expect(hashPassword).toHaveBeenCalledTimes(1);

      // test the generateAccessToken() function call execution
      expect(generateAccessToken).toHaveBeenCalledWith({
        id: 1,
        name: 'John Doe',
        email: mockUserData.email
      });
      expect(generateAccessToken).toHaveBeenCalledTimes(1);

      // test the generateRefreshToken() function call execution
      expect(generateRefreshToken).toHaveBeenCalledWith({
        id: 1,
        name: 'John Doe',
        email: mockUserData.email
      });
      expect(generateRefreshToken).toHaveBeenCalledTimes(1);
    });
  });
})