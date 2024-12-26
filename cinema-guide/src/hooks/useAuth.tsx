import { useMutation, useQuery } from "@tanstack/react-query";
import { logout, login, registerUser, me } from "../api/AuthApi";
import { IRegistrationUserData } from "../api/api";
import { LoginUserForm } from "../components/Authentification/LoginForm";
import { useAppDispatch } from "../redux/hooks";
import { clearUser, setUser, setAuthenticated } from "../redux/authSlice";
import { setFavorites } from "../redux/favoritesSlice";
import { closeModal } from "../redux/modalSlice";

export const useLogin = () => {

  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (userData: LoginUserForm) => login(userData),
    onSuccess: async () => {
      const userData = await me()
      dispatch(setUser(userData))
      localStorage.setItem('currentUser', JSON.stringify(userData))
      localStorage.setItem('favoritesId', JSON.stringify(userData.favorites))
      dispatch(setAuthenticated(true))
      dispatch(setFavorites(userData.favorites))
      dispatch(closeModal())
      console.log('Логин прошел успешно!')
    },
    onError: (error) => {
      console.error('Ошибка при логине:', error);
    },
  })

}

export const useLogout = () => {

  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(clearUser())
      localStorage.removeItem('currentUser');
      console.log('Выход успешно совершен')
    },
    onError: (error) => {
      console.error('Ошибка при выходе:', error);
    },
  })

}

export const useRegister = () => {

  return useMutation({
    mutationFn: (userData: IRegistrationUserData) => registerUser(userData),
    onSuccess: () => {
      console.log('Регистрация прошла успешно!')
    },
    onError: (error) => {
      console.error('Ошибка при регистрации:', error);
    },
  })

}

export const useFetchUser = () => {

  const query =
    useQuery({
      queryKey: ['currentUser'],
      queryFn: me,
      refetchOnWindowFocus: false,
    })

  return { userData: query.data, isLoading: query.isLoading, isError: query.isError, isSuccess: query.isSuccess, refetch: query.refetch };
}