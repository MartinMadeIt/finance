import { UseMutationResult } from "@tanstack/react-query"
import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { FiEdit3 } from "react-icons/fi"
import { updateLoanName } from "../../../Controllers/databaseActions"
import { useEditName } from "../../../Controllers/useLoanData"
// import { useEditName } from "../../../Controllers/useLoanData"
import styles from "./EditButton.module.scss"


function EditButton({columnName}:{columnName:string}) {

const [isOpen, setIsOpen] = useState(false)
const [inputValue, setInputValue] = useState("")

const {mutate:editName} = useEditName()

  return (
    <div className={styles.container}>
        <button 
            className={styles.edit}
            onClick={()=>setIsOpen(true)}
        >
        <FiEdit3 />
        </button> 
        {isOpen &&
            <div className={styles.inputField}>
                <button className={styles.close} onClick={() => setIsOpen(!isOpen)}><AiFillCloseCircle /></button>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={styles.input}/>
                <button
                    type="submit"
                    onClick={()=> {
                        editName({columnValue: `${columnName}`, newValue: `${inputValue}`} )
                        setIsOpen(false)
                    }}
                    className={styles.submit}
                >
                Submit
                </button>
            </div>
        }
    </div>
  )
}

export default EditButton