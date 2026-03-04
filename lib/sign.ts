"use client";

import { signIn } from "next-auth/react";


export const submit = async () => {
  await signIn("google");
};
