import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegister } from "../../hooks/useAuth";

const RegisterUserSchema = z.object({
  email: z.string().email('Введите корректный email'),
  name: z.string().min(5, "Имя пользователя должно содержать как минимум 5 символов"),
  surname: z.string().min(5, "Фамилия пользователя должно содержать как минимум 5 символов"),
  password: z.string().min(8, "Пароль должен содержать как минимум 8 символов"),
  confirmPassword: z.string().min(8, "Пароль должен содержать как минимум 8 символов")
})
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Пароли должны совпадать',
    path: ['confirmPassword'],
  });

export type RegisterUserForm = z.infer<typeof RegisterUserSchema>

export const RegistrationForm = ({ onSuccessfulRegistration }) => {

  const [isRegistered, setIsRegistered] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterUserForm>({
    shouldFocusError: false,
    resolver: zodResolver(RegisterUserSchema)
  })

  const { mutate: registerUser, isPending, isSuccess, isError, status } = useRegister()

  const onSubmit = async (data: RegisterUserForm) => {
    const { confirmPassword, ...userData } = data;
    registerUser(userData)

  };

  useEffect(() => {
    reset()
    if (status === 'success') {
      console.log(isRegistered)
      setIsRegistered(true)
      onSuccessfulRegistration()
    }
  }, [isSuccess])

  return (
    <>
      {isSuccess && isRegistered && (
        <>
          <p className="registration__title">Регистрация завершена</p>
          <p className="registration__subtitle">Используйте вашу электронную почту для входа</p>
        </>
      )}
      {!isRegistered && (
        <>
          <h3 className="registration__title">Регистрация</h3>
          <form className="auth-form" action="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register("email")} onChange={() => clearErrors("email")} className={errors.email ? 'auth-input-style auth-input-email warning-input-style' : "auth-input-style auth-input-email"} placeholder="Электронная почта" />
            {errors.email && <p className="warning-style">{errors.email.message}</p>}

            <input type="text" {...register("name")} onChange={() => clearErrors("name")} className={errors.name ? "auth-input-style auth-input-name warning-input-style" : "auth-input-style auth-input-name"} placeholder="Имя" />
            {errors.name && <p className="warning-style">{errors.name.message}</p>}

            <input type="text" {...register("surname")} onChange={() => clearErrors("surname")} className={errors.surname ? "auth-input-style auth-input-name warning-input-style" : "auth-input-style auth-input-name"} placeholder="Фамилия" />
            {errors.surname && <p className="warning-style">{errors.surname.message}</p>}

            <input type="password" {...register("password")} onChange={() => clearErrors("password")} className={errors.password ? "auth-input-style auth-input-password warning-input-style" : "auth-input-style auth-input-password"} placeholder="Пароль" />
            {errors.password && <p className="warning-style">{errors.password.message}</p>}

            <input type="password" {...register("confirmPassword")} onChange={() => clearErrors("confirmPassword")} className={errors.confirmPassword ? "auth-input-style auth-input-password warning-input-style" : "auth-input-style auth-input-password"} placeholder="Подтвердите пароль" />
            {errors.confirmPassword && <p className="warning-style">{errors.confirmPassword.message}</p>}

            <button type="submit" className="auth-submit-btn blue-button" disabled={isPending ? true : false}>{isPending ? 'Загрузка' : 'Создать аккаунт'}</button>

          </form>
        </>
      )
      }

      {isError && (
        <span className="warning-style">При регистрации произошла ошибка :(</span>
      )}
    </>
  )

}