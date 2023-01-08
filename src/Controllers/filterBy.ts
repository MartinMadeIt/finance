import { supabase } from "../Utilities/supabaseClient";

export const getListOf = async <T>({filterValue}:{filterValue:string}) => {
    const { data: users } = await supabase
    .from('users')
    .select(filterValue)
    return users as T
}
