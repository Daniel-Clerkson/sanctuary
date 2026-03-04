"use client";

import { submit } from "@/lib/sign"
import { FaGoogle } from "react-icons/fa6";

function SignIn() {
  return (
    <button
      onClick={() => submit()}
      className="flex text-sm items-center justify-center cursor-pointer hover:scale-[1.1] hover:bg-gold h-12 w-full rounded-xl hover:text-[#0A0A0A] font-medium transition"
    >
      Continue With Google
      <FaGoogle className="ml-3" />
    </button>
  );
}

export default SignIn;
