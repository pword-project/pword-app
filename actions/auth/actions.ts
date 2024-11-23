import { supabase } from "@/utils/supabase";

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
