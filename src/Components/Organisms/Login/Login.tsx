import { useFormik } from "formik"
import Input from "../../Atoms/Input/Input"
import styles from "./Login.module.scss"
import { supabase } from "../../../Utilities/supabaseClient"
import { ReactNotifications } from "react-notifications-component"
import 'react-notifications-component/dist/scss/notification.scss'
import { showNotification } from "../../../Helpers/addNotification"
import { motion } from "framer-motion"
import { useAppDispatch } from "../../../Redux/hooks"
import { logIn } from "../../../Redux/authSlice"
import {  useNavigate } from "react-router-dom"


function Login() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            })

            if(data.session) {
                dispatch(logIn())
                navigate("/")
                
            } else {
                showNotification('Ivalid data !', 'Invalid E-mail or password', 'danger')
                console.log("Nope");
            }
        }
    })
    
    return (
        <div className={styles.login}>

            <motion.div 
                className={styles.shape1} 
                initial={{y:'100vh'}}
                animate={{y:0}}
            />
            
            <motion.div 
                className={styles.shape2} 
                initial={{y:'-100vh'}}
                animate={{y:0}}
            />
            <motion.p 
                className={styles.signin}
                initial={{x:-550, opacity: 0}}
                animate={{x:0, opacity: 1}}
                transition={{delay: .3, duration:0.6, type: "spring", bounce: .3}}
                >Sign In</motion.p>

            <ReactNotifications />

            <div className={styles.card}>
                <form onSubmit={loginFormik.handleSubmit}>

                    <div className={styles.inputs}>
                        <Input type="text" name="email" placeholder="E-mail" formik={loginFormik} />
                        <Input type="password" name="password" placeholder="Password" formik={loginFormik} />
                    </div>
                    {/* <Button type="submit" style="success" text='Submit' /> */}
                    <button className={styles.submit} type='submit'>Submit</button>
                </form>
            </div>
            
        </div>
    )
}

export default Login