import styles from "./LoanTracker.module.scss"
import { AiOutlinePlus } from "react-icons/ai"
import { useLayoutEffect, useState } from "react"
import { AddNewLoad } from "./AddNewLoan"
import { NavbarLogged } from "../../Molecules/Navbar/Navbar"
import { motion } from "framer-motion"
import { getUSER } from "../../../Controllers/loginManage"
import { fetchLoanDatas } from "../../../Controllers/databaseActions"
import { LoanStatusType } from "../../../Utilities/types"
import { LoanView } from "./LoanView"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"





function LoanTracker() {

  const [isAddOpen, setIsAddOpen] = useState(false)

  const {data:loanData} = useQuery(['loans'], () => getLoanDatas())


  async function getLoanDatas () {
    const user = await getUSER();
    if (typeof user?.id === "string") {
      const loanDatas = await fetchLoanDatas<LoanStatusType[]>({id:user?.id})
      return loanDatas
    }
  }

  const handleClose = () => setIsAddOpen(false)
  
  return (
    <div className={styles.bg}>
      <div className={styles.container}>

        <NavbarLogged />
        {isAddOpen && <AddNewLoad action={handleClose}/>}
        
        <motion.button 
          className={styles.newLoan} 
          onClick={()=>setIsAddOpen(true)}
          initial={{x:'300vw', y: '300vh'}}
          animate={{x:0, y:0}}
          transition={{type: "spring"}}
          >
          <AiOutlinePlus />
        </motion.button>

        {
        loanData?.map((element, index) => {
          return (
            <Link to={`${element.loan_id}`} key={index}>
              <LoanView 
                name={element.name} 
                totalAmount={element.total_amount} 
                amountLeft={element.amount_left} 
                colour={element.colour} 
              />
            </Link>
          )
        })
        }

      </div>
    </div>
  )
}

export default LoanTracker