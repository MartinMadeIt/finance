import { useFormik } from "formik"
import { motion } from "framer-motion"
import { AiFillCloseCircle, AiFillLock, AiFillUnlock } from "react-icons/ai"
import styles from "./LoanTracker.module.scss"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { getUSER } from "../../../Controllers/loginManage"
import { createNewLoan } from "../../../Controllers/databaseActions"
import Input from "../../Atoms/Input/Input"


const newLoanValidation = yup.object({
    nameOfLoan : yup.string().max(30, '30 letters is max').required(),
    amount : yup.number().required().min(100),
    accountNumber: yup.string().matches(/^[0-9]*$/).min(26).max(26), 
    transferTitle: yup.string()
})

// todo motion przenieść na variants
export const AddNewLoad = ({action}:{action:()=>void}) => {

    const [user, setUser] = useState("")
    const [checkedField, setCheckedField] = useState(false)
    const [colour, setColour] = useState("red")

    useEffect(() => {
        getUSER().then(data => setUser(data?.id as string))
    }, [])

    const newLoanFormik = useFormik({
        initialValues: {
            nameOfLoan: "",
            amount: 0,
            accountNumber:"", 
            transferTitle:""
        },
        onSubmit: async (values, {resetForm}) => {
            createNewLoan({
                amount: values.amount, 
                nameOfLoan: values.nameOfLoan, 
                user: user, 
                colour:colour,
                accountNumber: values.accountNumber,
                transferTitle: values.transferTitle
            })
            resetForm()
            action()
        },
        validationSchema : newLoanValidation
    })

    return (
      <motion.div
        className={styles.containerAdd}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration:0.3}}
        >
          <motion.div
            className={styles.card}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration:0.3}}
          >
            
            <form onSubmit={newLoanFormik.handleSubmit} className={styles.form}>
                <Input type="text" name="nameOfLoan" placeholder="Loan name *" formik={newLoanFormik} />
                <Input type="number" name="amount" placeholder="Loan amount *" formik={newLoanFormik} />
                <Input type="text" name="accountNumber" placeholder="Account Number" formik={newLoanFormik} />
                <Input type="text" name="transferTitle" placeholder="Transfer Title" formik={newLoanFormik} />

                <div className={styles.colourPicker}>
                    {/* <input type="text" readOnly className={styles.picked} value={colour} /> */}
                    <div className={styles.colours}>
                        <div className={styles.picked} style={{backgroundColor:`rgb(${colour})`}}/>
                        <div className={styles.red} onClick={()=>setColour("255, 0, 0")}/>
                        <div className={styles.blue} onClick={()=>setColour("0, 0, 255")}/>
                        <div className={styles.violet} onClick={()=>setColour("85, 0, 182")}/>
                        <div className={styles.green} onClick={()=>setColour("0, 255, 0")}/>
                    </div>
                </div>

                {(!newLoanFormik.errors.amount && !newLoanFormik.errors.nameOfLoan)
                && (newLoanFormik.touched.amount && newLoanFormik.touched.nameOfLoan)
                &&
                <div className={styles.check}>
                    <input 
                        type="checkbox" 
                        name="radio" 
                        onChange={()=>setCheckedField(!checkedField)}
                        checked={checkedField}
                    />
                    <p className={styles.checkDescription}>I'm sure that I want to create new loan</p>
                </div>
                }
                <div className={styles.submitField}>
                    <p className={!checkedField ? styles.lockIcon : styles.unlockIcon}>
                    {!checkedField ? <AiFillLock /> : <AiFillUnlock />}
                    </p>
                    <button 
                        className={checkedField ? styles.submitLoan : styles.submitLoanDis}
                        type='submit'
                        disabled={!checkedField}
                    >Submit</button>
                </div>

            </form>

            <button onClick={action} className={styles.close}><AiFillCloseCircle /></button>
          </motion.div>
      </motion.div>
    )
  }