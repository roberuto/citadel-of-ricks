import { loginMutation } from "../../app/features/auth/graphql/mutations/login-auth.mutation";
import { signUpMutation } from "../../app/features/auth/graphql/mutations/sign-up-auth.mutation";

export const mutation = {
  login: loginMutation,
  signUp: signUpMutation,
};
