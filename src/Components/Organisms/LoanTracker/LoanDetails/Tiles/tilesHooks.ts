import { useQuery } from "@tanstack/react-query"
import { fetchLoanDetails, getHistory, getHistoryDetails, getSpentIdsByLoanId } from "../../../../../Controllers/databaseActions"
import { getUSER } from "../../../../../Controllers/loginManage"
import { LoanStatusType } from "../../../../../Utilities/types"
import { historyType } from "../LoanDetails"
import { getLoanType } from "./TilesForLoanDetails"


export const useUser = () => {
    const {data:user} = useQuery(['user'], () => getUSER())
    return {user}
}

export const useLoanDetails = ({loanId}:{loanId:number}) => {
    const {data:loanDatas} = useQuery(['loan', loanId], () => fetchLoanDetails<LoanStatusType>({id:Number(loanId)}))
    return {loanDatas}
}

export const useHistory = ({loanId}:{loanId:number}) => {
    const {data:history} = useQuery(['historyFull'], () => getHistory({loanId: loanId}))

    async function getHistory ({loanId}:{loanId:number}) {
        let spentIdsArray:number[] = [];

        const spentIds = await getSpentIdsByLoanId<getLoanType[]>({loanId:Number(loanId)})
        spentIds.forEach(element => spentIdsArray.push(element.spent_id))

        const history = await getHistoryDetails<historyType[]>({ids:spentIdsArray})
        return history
    }

    return {history}
}