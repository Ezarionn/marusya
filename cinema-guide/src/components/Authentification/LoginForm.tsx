import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from "../../hooks/useAuth";

const LoginUserSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(8, "Пароль должен содержать как минимум 8 символов")
})

export type LoginUserForm = z.infer<typeof LoginUserSchema>

export const LoginForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<LoginUserForm>({
    shouldFocusError: false,
    resolver: zodResolver(LoginUserSchema)
  })

  const { mutate: login, isPending, isError, isSuccess } = useLogin()

  const onSubmit = async (data: LoginUserForm) => {
    login(data);
  };

  useEffect(() => {
    reset();
  }, [isSuccess])

  return (
    <>
      <form className="auth-form enter__form-login" action="POST" onSubmit={handleSubmit(onSubmit)} noValidate>

        <input type="email" {...register("email")} onChange={() => clearErrors("email")} className={errors.email ? 'auth-input-style auth-input-email warning-input-style' : 'auth-input-style auth-input-email'} placeholder="Электронная почта" />
        {errors.email && <p className="warning-style">{errors.email.message}</p>}

        <input type="password" {...register("password")} onChange={() => clearErrors("password")} className={errors.password ? 'auth-input-style auth-input-password warning-input-style' : 'auth-input-style auth-input-password'} placeholder="Пароль" />
        {errors.password && <p className="warning-style">{errors.password.message}</p>}

        <button type="submit" className="auth-submit-btn blue-button" disabled={isPending ? true : false}>
          {isPending ? "Загрузка" : "Войти"}
        </button>
      </form>
      {isError && 'Произошла ошибка при входе'}
    </>
  )

}