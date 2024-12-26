import { IUserData } from "../api/api";

export const getInitials = (user: IUserData): string => {

  const nameWord = user.name.charAt(0).toUpperCase()
  const surnameWord = user.surname.charAt(0).toUpperCase()

  return `${nameWord}${surnameWord}`
}