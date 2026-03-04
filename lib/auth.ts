import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      const { data } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!data) {
        await supabase.from("users").insert({
          email: user.email,
          name: user.name,
        });
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      const { data } = await supabase
        .from("users")
        .select("onboarded")
        .eq("email", url)
        .single();

      if (data && !data.onboarded) return `${baseUrl}/auth/onboarding`;
      return `${baseUrl}/dashboard`;
    },
  },
});