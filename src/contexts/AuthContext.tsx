import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";

import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoanding: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContentProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoanding, setIsUserLoanding] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '808243448160-go8bmegssd4m3koeucjkmcas0nq333jl.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoanding(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoanding(false);
    }
  }

  async function singInWithGoogle(access_token: string) {
    console.log("TOKEN DE AUTENTICAÇÃO", access_token);
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      singInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoanding,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
