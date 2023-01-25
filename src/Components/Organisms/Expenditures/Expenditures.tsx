import { useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { getCategories } from "../../../Controllers/databaseActions"
import { getUSER } from "../../../Controllers/loginManage"
import { CategoriesType } from "../../../Utilities/types"
// import Input, { SearchInput } from "../../Atoms/Input/Input"
import { NavbarLogged } from "../../Molecules/Navbar/Navbar"
import styles from "./Expenditures.module.scss"
import * as yup from "yup"
import GeneralExp from "./Sections/GeneralExp/GeneralExp"
import AddExpense from "./Sections/AddExpense/AddExpense"
import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { BiCalendarCheck } from "react-icons/bi"
import { showNotification } from "../../../Helpers/addNotification"
import { ReactNotifications } from "react-notifications-component"
import { useGetExpenditures, useGetTime, useGetTotalExpense } from "./expHooks"
import { GrFormClose } from "react-icons/gr"
import { BsCalendar3 } from "react-icons/bs"


const dateValidation = yup.object({
  startDate: yup.date().required() ,
  endDate: yup.date().required()
})

export type NameTotalType = [{
  name: string,
  amount: number
}]


function Expenditures() {

  const [addOpen, setAddOpen] = useState(false)
  const [isManageOpen, setManageOpen] = useState(false)

  const {data:user} = useQuery(['user'], () => getUSER())
  const userId = user?.id
  

  const {data:categories} = useQuery(['categories'], () => getCategories<CategoriesType[]>())

  const {todayIso, todayTime, yesterdayIso, yesterdayTime} = useGetTime()

  const [start, setStart] = useState({iso: yesterdayIso, gettime: yesterdayTime})
  const [end, setEnd] = useState({iso: todayIso, gettime: todayTime})


  const {expenditures} = useGetExpenditures({userId: `${userId}`, startDate: start.iso, endDate: end.iso})
  console.log(expenditures)
  const {total} = useGetTotalExpense({userId: `${userId}`, startDate: start.iso, endDate: end.iso})
  

  const dateForm = useFormik({
    initialValues: {
      startDate: yesterdayIso,
      endDate: todayIso
    },
    onSubmit: (values) => {
      const tempStart = new Date(values.startDate)
      const tempEnd = new Date(values.endDate)

      if(tempEnd.getTime() > tempStart.getTime()) {

        setStart({iso: tempStart.toISOString(), gettime: tempStart.getTime()})
        setEnd({iso: tempEnd.toISOString(), gettime: tempEnd.getTime()})
        
      } else {
        showNotification('Nope', 'I will not send datas to DS', 'warning')
      }
    },
    validationSchema: dateValidation
  })

  const handleAdd = () => setAddOpen(true)
  const handleManage = () => setManageOpen(true)

  return (
    <>
    <NavbarLogged />
    <ReactNotifications />
    
      <div className={styles.container}>

      {isManageOpen &&
        <div className={styles.manage}>
          <form onSubmit={dateForm.handleSubmit} className={styles.form}>
            <button type="button" onClick={() => setManageOpen(false)} className={styles.close}><GrFormClose /></button>
            <input type="date" name="startDate" max={yesterdayIso.split("T")[0]} value={dateForm.values.startDate.split("T")[0]} onChange={dateForm.handleChange} />
            <input type="date" name="endDate" max={todayIso.split("T")[0]} value={dateForm.values.endDate.split("T")[0]} onChange={dateForm.handleChange} />
            <button className={styles.check}><BiCalendarCheck /></button>
          </form>
        </div>}

        <div className={styles.expenditures}>
          <GeneralExp total={Number(total)} expenditures={expenditures} />
        </div>

        {addOpen && 
          <AddExpense 
            categories={categories} 
            userId={String(userId)} 
            closeCallback={() => setAddOpen(false)}
          />
        }


      <button className={styles.add} onClick={()=> handleAdd() }><AiOutlinePlus /></button>
      <button className={styles.manageButton} onClick={()=> handleManage() }><BsCalendar3 /></button>


      </div>
    </>

  )
}

export default Expenditures