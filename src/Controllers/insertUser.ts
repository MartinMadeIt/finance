import { registerValues } from '../Components/Organisms/Register/Register'; 
import { supabase } from '../Utilities/supabaseClient';

 async function insertUser(id:string, user:registerValues) {
    const { data } = await supabase
    .from('users')
    .insert({
      user_id:id,
      username:user.user,
      profession:user.profession
    })
    return data
  
  }

  export default insertUser;