import ProfilePage from "@/components/ProfilePage";
import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function  Profile() {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)
    
    const { data: { user } } = await supabase.auth.getUser()

    return <ProfilePage user={user} />
}