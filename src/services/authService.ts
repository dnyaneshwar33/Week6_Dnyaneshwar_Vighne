import User from '../models/userModel';
import bcrypt from 'bcrypt';

export const registerUser = async (username: string, password: string, email: string, isAdmin: boolean) => { // Accept isAdmin parameter
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, email, isAdmin }); // Include isAdmin when creating user
  return user;
};

export const findUserByUsername = async (username: string) => {
  return User.findOne({ where: { username } });
};

export const findUserById = async (id: number) => {
  return User.findByPk(id);
};
