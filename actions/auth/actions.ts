import { supabase } from "@/utils/supabase";
import {
  VerifyEmailOtpParams,
} from "@supabase/supabase-js";

export async function signIn(email: string, password: string) {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
}

export async function signUp(email: string, password: string) {
  const response = await supabase.auth.signUp({
    email,
    password,
  });

  return response;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  return { error };
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}

export async function signInOtp(email: string) {
  const response = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });
  return response;
}

type VerifyOtp = VerifyEmailOtpParams;
export async function verifyOtp({ token, email }: VerifyOtp) {
  const response = await supabase.auth.verifyOtp({
    type: "email",
    token,
    email,
  });
  return response;
}
