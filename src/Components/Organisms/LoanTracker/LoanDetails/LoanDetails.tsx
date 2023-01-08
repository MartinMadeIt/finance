/*          Kolejka do wywalenia           */
    // useLayoutEffect(() => {
    //   fetchLoanDetails<LoanStatusType>({id:Number(loanIndex)})
    //     .then(data => {
    //         getUSER().then(user => {
    //             if(user?.id === data.owner) {
    //                 console.log("Loop triggered")
    //                 setDetails(data)
    //                 setPercentage((data.total_amount - Number(data.amount_left))/data.total_amount*100)
    //             } else {
    //                 navigate("/")
    //             }
    //         })
    //     })
    // },[refresh])

    // const {data:dataHistory} = useQuery(['history'], () => getHistory<CreditHistoryType[]>({loanId: Number(loanIndex)}))


import {  useEffect, useState } from "react"
import { AiFillCloseCircle, AiOutlineDelete } from "react-icons/ai"
import {  useNavigate, useParams } from "react-router-dom"
import { createSpendingAfterLoanPay, deleteLoan, fetchLoanDetails, getAmountBySpent, getHistory, getSpentIdsByLoanId, updateAmountLeft, updateCreditHistory, updateLoanParameter } from "../../../../Controllers/databaseActions"
import { getUSER } from "../../../../Controllers/loginManage"
import {  LoanStatusType, SpentType } from "../../../../Utilities/types"
import { NavbarLogged } from "../../../Molecules/Navbar/Navbar"
import styles from "./LoanDetails.module.scss"
import CopyButton from "../../../Atoms/CopyButton/CopyButton"
import { BsInfoCircleFill } from "react-icons/bs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoanName, TileActions, TileAmountLeft, TileHistory, TileInfo, TilePercentage }from "./Tiles/TilesForLoanDetails"
import { ReactNotifications } from "react-notifications-component"
import { useLoanDetails, useUser } from "./Tiles/tilesHooks"



export type historyType = {
    amount:number,
    created_at: string,
    creditHistory : {
        spent_id:number
    }
}

function LoanDetails() {


    const navigate = useNavigate()
    
    const [isAware, setIsAware] = useState(false)
    const {loanIndex} = useParams()


    const {data:dataLoan} = useQuery(['loan', loanIndex], () => fetchLoanDetails<LoanStatusType>({id:Number(loanIndex)}))
    const {data:dataUser} = useQuery(['user'], () => getUSER())

    /*           TODO :   rewrite upper functions and export them as useHooks + make history invalidating after submiting new payment                     */

    // const {dataUser} = useUser();
    // const {dataLoan} = useLoanDetails({loanId: Number(loanIndex)})

        return (
            <>
            <NavbarLogged />
            <ReactNotifications />

            <div className={styles.container}>

                <LoanName loanId={Number(loanIndex)}/>
                
                <TilePercentage 
                    loanTotalAmount={dataLoan?.total_amount} 
                    amountLeft={Number(dataLoan?.amount_left)} 
                    colour={String(dataLoan?.colour)} 
                />


                <TileAmountLeft amountLeft={Number(dataLoan?.amount_left)} />

                <TileInfo 
                    colour={String(dataLoan?.colour)} 
                    accountForTransfer={String(dataLoan?.account_number)}
                    transferTitle={String(dataLoan?.title_for_transfer)}
                />
                
                <TileHistory loanIndex={Number(loanIndex)} />
                
                <TileActions 
                    colour={String(dataLoan?.colour)}
                    loanId={Number(dataLoan?.loan_id)}
                    userId={String(dataUser?.id)}
                    amountLeft={Number(dataLoan?.amount_left)}
                />


                <div className={styles.chart}>Linear chart of "how much left" with dates</div>



                <div className={styles.question}>
                    <div className={styles.aware}>
                        <p>I want to permantly delete loan datas. I know that I won't be able to restore datas</p>
                        <input type="checkbox" checked={isAware} onChange={() => setIsAware(!isAware)}/>
                    </div>

                </div>

                <div className={styles.bin}>
                    <button
                        className={isAware ? styles.delete : styles.deleteInactive}
                        onClick={() => {
                            deleteLoan({loanId: Number(dataLoan?.loan_id)})
                            navigate("/loan")
                        }}
                        disabled={!isAware}
                    >
                    <AiOutlineDelete />
                    </button>
                </div>


            </div>
            </>
        )
}

export default LoanDetails