
import { supabase } from "../Utilities/supabaseClient";



export async function getUSER () {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export async function signOUT () {
    const { error } = await supabase.auth.signOut()
}



