// auth.service.ts

import { supabase } from "../../lib/supabase.js";

export async function signup(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}
