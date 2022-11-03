import { createContext, ReactNode } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContentProvider({ children }: AuthProviderProps) {

  async function signIn() {
    console.log('Vamos Logar!')
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "Alisson Silva",
          avatarUrl: "https://github.com/alissonjosef.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
