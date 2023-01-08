import { useFormik } from "formik"
import Button from "../../Atoms/Button/Button"
import {Input, SearchInput } from "../../Atoms/Input/Input"
import { ContainerColumn } from "../../UtilityComponents/Container/Container"
import styles from "./Register.module.scss"
import * as yup from 'yup'
import QuickSettings from "../../Molecules/QuickSettings/QuickSettings"
import { createUser } from "../../../Controllers/createUser"
import { InferType } from "yup"
import { useEffect, useState } from "react"
import { getListOf } from "../../../Controllers/filterBy"
import { Autocomplete, TextField } from "@mui/material"
import { motion } from "framer-motion"

export interface Register {
    user: string;
    email: string;
    password: string,
    confirmPass: string,
    profession: string
};
  
const yupRegister = yup.object({
    user: yup.string().required(),
    email: yup.string().email("Use correct e-mail syntax: example@site.xx").required(),
    password: yup.string().required(),
    confirmPass: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    profession: yup.string().required(),
})


export type registerValues = InferType<typeof yupRegister>


function Register() {

    const [professions, setProfessions] = useState<string[]>()
    const temporaryProfs:string[] = []

    useEffect(() => {
        getListOf<[{profession:string}]>({filterValue:'profession'})
            .then(list => {
                list.forEach(element => {
                    temporaryProfs.push(element.profession)
                })
                setProfessions(temporaryProfs.filter((item, index) => temporaryProfs.indexOf(item) === index))
            })

    }, [])


    const [valueFromAuto, setValueFromAuto] = useState("")

    const registerFormik = useFormik<registerValues>({
        initialValues: {
            user:"",
            email:"",
            password:"",
            confirmPass:"",
            profession:""
          },
        onSubmit: (values, {resetForm}) => {
            createUser({
                user: values.user,
                email: values.email,
                password: values.password,
                confirmPass: values.confirmPass,
                profession: values.profession
            })

        resetForm({values: registerFormik.initialValues})

        },
        validationSchema: yupRegister
    })

    return (
        <div className={styles.register}>
            {/* <div className={styles.themeChangerPosiotion}>
                <QuickSettings />
            </div> */}
            <motion.p 
                className={styles.registerText}
                initial={{x:-550, opacity: 0}}
                animate={{x:0, opacity: 1}}
                transition={{delay: .3, duration:0.6, type: "spring", bounce: .3}}
                >Register
            </motion.p>
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
            
            <div className={styles.shape2} />
            <div className={styles.card}>
                <form onSubmit={registerFormik.handleSubmit}>
                    <div className={styles.inputs}>
                    <div className={styles.opt}>
                    <Input type="text" name="user" placeholder="Username" formik={registerFormik} value={registerFormik.values.user} />
                    {registerFormik.touched.user && registerFormik.errors.user && <div className={styles.error}>{registerFormik.errors.user}</div>}
                    </div>

                    <div className={styles.opt}>
                    <Input type="text" name="email" placeholder="E-mail" formik={registerFormik} value={registerFormik.values.email}  />
                    </div>

                    <div className={styles.opt}>
                    <Input type="password" name="password" placeholder="Password" formik={registerFormik}  value={registerFormik.values.password} />
                    </div>

                    <div className={styles.opt}>
                    <Input type="password" name="confirmPass" placeholder="Confirm" formik={registerFormik} value={registerFormik.values.confirmPass}  />
                    </div>

                    {/* <SearchInput name='profession' formik={registerFormik} value={registerFormik.values.profession} dataset={professions} /> */}
                    <SearchInput getValueFromAuto={(valueFromAuto:string )=> {registerFormik.setFieldValue('profession', valueFromAuto)}} dataset={professions} formik={registerFormik} name={'profession'} value={registerFormik.values.profession} />
                    </div>
                    {/* <Button type="submit" style="success" text='Submit' /> */}
                    <button className={styles.submit} type='submit'>Submit</button>
                </form>
            </div>
        </div>
  )
}

export default Register