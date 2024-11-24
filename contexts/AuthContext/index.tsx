import { signIn, signOut, signUp } from "@/actions/auth/actions";
import useAsyncStorageState from "@/hooks/useAsyncStorageState";
import { supabase } from "@/utils/supabase";
import {
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
} from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";

type Context = {
  session: Session | null;
  setSession: (session: Session) => void;
  login: (
    email: string,
    password: string,
  ) => Promise<AuthTokenResponsePassword>;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isLogged: () => boolean;
  loading: boolean;
};

const SignupContext = createContext<Context>({} as Context);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession, loading] = useAsyncStorageState<Session | null>({
    key: "session",
    initialValue: null,
  });

  function isLogged() {
    return !!session;
  }

  async function login(email: string, password: string) {
    const { error, data }: AuthTokenResponsePassword = await signIn(
      email,
      password,
    );

    return { error, data } as AuthTokenResponsePassword;
  }

  async function signup(email: string, password: string) {
    const { error, data } = await signUp(email, password);

    return { error, data } as AuthResponse;
  }

  async function logout() {
    await signOut();
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SignupContext.Provider
      value={{
        session,
        setSession,
        login,
        signup,
        logout,
        isLogged,
        loading,
      }}
    >
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
