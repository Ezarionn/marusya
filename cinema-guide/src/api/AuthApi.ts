import axios from "axios";
import { URL } from "./api";
import { IRegistrationUserData, IUserData } from "./api";
import type { LoginUserForm } from "../components/Authentification/LoginForm";

export const login = async (userData: LoginUserForm) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, userData, {
      withCredentials: true
    });
    return response.data
  } catch (error) {
    console.error('Ошибка при логине: ', error);
    throw error;
  }
}

export const logout = async () => {
  try {
    const response = await axios.get(`${URL}/auth/logout`, {
      withCredentials: true
    });
    return response.data
  } catch (error) {
    console.error('Ошибка при выходе: ', error);
    throw error;
  }
}

export const registerUser = async (userData: IRegistrationUserData) => {
  try {
    const response = await axios.post(`${URL}/user`, userData, {
      withCredentials: true
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при регистрации: ', error);
    throw error;
  }
}

export const me = async (): Promise<IUserData> => {
  try {
    const response = await axios.get(`${URL}/profile`, {
      withCredentials: true
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при получении данных пользователя: ', error);
    throw error;
  }
}