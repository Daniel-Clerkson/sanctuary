import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function useUser() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user?.email) return

    async function fetchUser() {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("email", session?.user?.email)
        .single()

      setUser(data)
      setLoading(false)
    }

    fetchUser()
  }, [session])

  return { user, loading, session }
}