import { isError, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { createSpendingAfterLoanPay, fetchLoanParameter, getAmountBySpent, getHistory, getHistoryDetails, getSpentIdsByLoanId, updateAmountLeft, updateCreditHistory, updateLoanParameter } from "../../../../../Controllers/databaseActions";
import { useGetLoanParameter, useUpdateLeft } from "../../../../../Controllers/useLoanData";
// import { useEditName } from "../../../../../Controllers/useLoanData";
import { showNotification } from "../../../../../Helpers/addNotification";
import { SpentType } from "../../../../../Utilities/types";
import CircularBar from "../../../../Atoms/CircularProgressBar/Circular";
import CopyButton from "../../../../Atoms/CopyButton/CopyButton";
import EditButton from "../../../../Atoms/EditButton/EditButton";
import { historyType } from "../LoanDetails";
import styles from "../LoanDetails.module.scss";
import { useHistory } from "./tilesHooks";

//      NAME TILE
interface nameType {
    name:string
}

export const LoanName = ({loanId}:{loanId:number}) => {

    const { data } = useQuery(["name"], () => fetchLoanParameter<nameType>({id:loanId, parameter:'name'}))

    return (
        <div className={styles.name}>
            {data?.name}
            <div className={styles.edit}>
                <EditButton columnName={String(data?.name)}/>
            </div>
        </div>
    )
}

//      PERCENTAGE % TILE
interface TilePercentageInterface {
    colour:string, 
    loanTotalAmount:number, 
    amountLeft:number
}

export const TilePercentage = ({colour, loanTotalAmount, amountLeft}:TilePercentageInterface) => {

    const [percentage, setPercentage] = useState(0)
    useEffect(() => { setPercentage((loanTotalAmount - amountLeft)/loanTotalAmount*100) })    
    
    return (
        <div className={styles.percent}>
            <CircularBar percent={percentage} colour={`rgb(${colour})`} />
        </div>
    )
}

//      AMONUT LEFT TILE
export const TileAmountLeft = ({amountLeft}:{amountLeft:number}) => {

    return (
        <div className={styles.amountLeft}>
            <p className={styles.text}>Ammount left : </p>
            <p className={styles.number}>{amountLeft} PLN</p>
        </div>
    )
}


//      INFO ABOUT LOAN TILE
interface TileInfoInterface {
    colour: string, 
    transferTitle: string,
    accountForTransfer: string
}

export const TileInfo = ({...props}:TileInfoInterface) => {

    const [infosOpen, setInfosOpen] = useState(false)


    return (
        <div className={styles.showData}>
            <button onClick={() => setInfosOpen(true)} className={styles.eye} style={{color:`rgb(${props.colour})`}}><BsInfoCircleFill /></button>
            {infosOpen &&
            <div className={styles.infosContainer} >
                <button className={styles.close} onClick={()=>setInfosOpen(false)}><AiFillCloseCircle /></button>
                <div className={styles.title}>
                    <p className={styles.description}>Transfer title:</p>
                    <div className={styles.infoBut}>
                        <p className={styles.info}>{props.transferTitle ? props.transferTitle : "Not provided"}</p>
                        <CopyButton text={String(props.transferTitle)} />
                    </div>

                </div>
                <div className={styles.account}>
                    <p className={styles.description}>Transfer account number:</p>
                    <div className={styles.infoBut}>
                        <p className={styles.info}>{props.accountForTransfer ? props.accountForTransfer : "Not provided"}</p>
                        <CopyButton text={String(props.accountForTransfer)} />
                    </div>
                </div>
            </div>
            }
        </div>
    )
}


//      HISTORY TILE
export type getLoanType = {
    loanStatus : {
        loan_id : number
    }, 
    spent_id : number
}


export const TileHistory = ({loanIndex}:{loanIndex:number}) => {

    const {data:dataFull} = useQuery(['historyFull'], () => getHistory())
    // const {dataFull} = useHistory({loanId:loanIndex})

    async function getHistory () {
        let spentIdsArray:number[] = [];

        const spentIds = await getSpentIdsByLoanId<getLoanType[]>({loanId:Number(loanIndex)})
        spentIds.forEach(element => spentIdsArray.push(element.spent_id))

        const history = await getHistoryDetails<historyType[]>({ids:spentIdsArray})
        return history
    }


    const timestampToDate = (timestamp:string) => {
        let format = new Date(timestamp);
        return format.toLocaleDateString()
    }


    return (
        <div className={styles.history}>
            <p className={styles.description}>History</p>
            <div className={styles.historyBox}>
                {
                dataFull?.map((element, index) => {
                    
                    return (
                        <div className={styles.historyElement} key={index}>
                            <p className={styles.created}>{timestampToDate(element.created_at)}</p>
                            <p className={styles.amount}>{element.amount} <span>PLN</span></p>
                        </div>
                    )
                }) 
                }
            </div>
            <div className={styles.bottomBlur} />
        </div>
    )
}


//      ACTIONS TILE
interface ActionsTileInterface {
    loanId: number, 
    userId: string,
    colour: string,
    amountLeft: number

}

export const TileActions = ({...props}:ActionsTileInterface) => {
    
    const query = useQueryClient()
    const todayDate = new Date()
    const [installment, setInstallment] = useState<number|null>(null)
    const [payDay, setPayDay] = useState(todayDate.toISOString())


    const handlePay = ({loanId, userId, amountLeft, installment}:{loanId:number, userId:string, amountLeft:number, installment:number}) => {
        const newValue = amountLeft - installment;
        if(newValue>=0){
            
            updateAmountLeft({loanId: loanId, newValue: newValue})
            createSpendingAfterLoanPay<SpentType>({userId: `${userId}`, installment: +installment, date:`${payDay}.010`})
                .then(data => {
                    updateCreditHistory({loanId: Number(loanId), spentId: data.spent_id})  
                })
                .then(data => {
                    query.invalidateQueries(["loan", String(loanId)])
                    query.invalidateQueries(["historyFull"])
                    })
            
            
        }
        else {
            showNotification(
                'Error !',
                'Your payment is higher than amount left to pay !',
                'danger'
            )
        }
    }

    return (
        <div className={styles.actions}>
            <div className={styles.inputFields}>
                <input type="number" placeholder="Amount of installment" value={installment ? installment : "Value"} onChange={(e) => setInstallment(Number(e.target.value))} />
                <input type="date" value={payDay.split("T")[0]} onChange={(e) => {
                    const chosenDate = new Date(e.target.value)
                    setPayDay(chosenDate.toISOString())
                }}/>
            </div>

            {installment !== null && <p className={styles.check}>I payed {installment} PLN on {payDay.slice(0,10)}</p>}

            <button 
                onClick={() => {
                    handlePay({ 
                        loanId:Number(props.loanId), 
                        userId: String(props.userId), 
                        amountLeft: Number(props.amountLeft), 
                        installment: Number(installment)
                    })
                }}
                style={{backgroundColor: `rgb(${props.colour})`}}
                className={styles.submit} 
            >
            Confirm
            </button>
        </div>
    )
}