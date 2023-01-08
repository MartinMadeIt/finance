import styles from "./AddExpense.module.scss"
import * as yup from "yup"
import { useFormik } from "formik"
import { CreateSpendingInterface, insertSpending } from "../../../../../Controllers/databaseActions"
import { SearchInput, Input} from "../../../../Atoms/Input/Input"
import { CategoriesType } from "../../../../../Utilities/types"
import { GrFormClose } from "react-icons/gr";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showNotification } from "../../../../../Helpers/addNotification"


const expenditureValidation = yup.object({
    amount: yup.number().min(0).max(400000).required("Amounut is required"),
    category: yup.string().min(3, 'Category should be longer than 2 chars').max(20, 'Category name max 20 chars')
  })

type AddExpenseType = {
    categories: CategoriesType[] | undefined,
    userId: string,
    closeCallback: () => void
}

function AddExpense({categories, userId, closeCallback}:AddExpenseType) {

    const catNames:string[] = categories ? categories.map(element => element.name as string) : ['']

    const expenditureForm = useFormik({
      initialValues: {
        amount: 0,
        category: ""
      },
      onSubmit: (values, {resetForm}) => {
        insertSpending({amount: values.amount, userId:String(userId), categoryName:values.category, catNames:catNames})
        resetForm()
      },
      validationSchema: expenditureValidation
    })
  

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <button onClick={() => closeCallback()} className={styles.close}><GrFormClose /></button>
                <form onSubmit={expenditureForm.handleSubmit} className={styles.form}>
                    <div className={styles.amount}>
                        <Input 
                        formik={expenditureForm} 
                        name={'amount'} 
                        type={'number'} 
                        placeholder={'Amount'} 
                        value={String(expenditureForm.values.amount)} 
                        />
                    </div>

                    <div className={styles.category}>
                        <SearchInput 
                        name={"category"} 
                        formik={expenditureForm} 
                        value={expenditureForm.values.category} 
                        dataset={catNames} 
                        getValueFromAuto={(valueFromAuto:string )=> {expenditureForm.setFieldValue('category', valueFromAuto)}}
                        />
                    </div>


                    <button type="submit" className={styles.addExp}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddExpense
