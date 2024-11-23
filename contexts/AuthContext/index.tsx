import { signIn, signOut, signUp } from "@/actions/auth/actions";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type Context = {
  user: string;
  setUser: (user: string) => void;
  login: (
    email: string,
    password: string,
  ) => Promise<AuthTokenResponsePassword>;
  logout: () => void;
  isLogged: () => boolean;
  signup: (
    email: string,
    password: string,
  ) => Promise<AuthResponse>;
};

const SignupContext = createContext<Context>({} as Context);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<string>("");
  const router = useRouter();

  function isLogged() {
    return !!user;
  }

  async function login(email: string, password: string) {
    const { error, data } = await signIn(email, password);

    if (error) {
      throw new Error(error.message);
    }

    if (data?.user?.email) {
      setUser(data.user.email);
    }

    router.push("/");

    return { error, data };
  }

  async function signup(email: string, password: string) {
    const { error, data } = await signUp(email, password);

    if (error) {
      throw new Error(error.message);
    }

    if (data?.user?.email) {
      setUser(data.user.email);
    }

    return { error, data };
  }

  async function logout() {
    await signOut();
    setUser("");
  }

  return (
    <SignupContext.Provider value={{ user, setUser, login, signup, logout, isLogged }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(SignupContext);

  if (!context) {
    throw new Error("useAuth must be used within a SignupProvider");
  }

  return context;
};
