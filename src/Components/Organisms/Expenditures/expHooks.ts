import { useQuery } from "@tanstack/react-query"
import { getCategoriesAmountByDate, getTotalExpenditures } from "../../../Controllers/databaseActions"
import { NameTotalType } from "./Expenditures"

interface FetchExpDatasType {
    userId : string,
    startDate:string,
    endDate:string
}

export const useGetExpenditures = ({userId, startDate, endDate}:FetchExpDatasType) => {
 
    const {data:expenditures, isError:errorExp} = useQuery({
      queryKey: ['expenditures', userId, startDate, endDate], 
      queryFn: async () => await getCategoriesAmountByDate<NameTotalType>({userId: userId, dateStart: startDate, dateEnd: endDate}), 
      enabled: !!userId})
  
    return {expenditures, errorExp}
  }


export const useGetTotalExpense = ({...props}:FetchExpDatasType) => {
    const {data:total} = useQuery({
        queryKey: ['total', props], 
        queryFn: () => getTotalExpenditures({
                userId: props.userId, 
                dateStart: props.startDate, 
                dateEnd: props.endDate
            }), 
        enabled: !!props.userId})
    
        return {total}
}

export const useGetTime = () => {
    const todayDate = new Date()
    const todayTime = todayDate.getTime()
    const todayIso = todayDate.toISOString()
    const yesterdayTime = new Date(todayDate.getTime() - 86400000).getTime()
    const yesterdayIso = new Date(todayDate.getTime() - 86400000).toISOString()

    return {todayDate, todayTime, todayIso, yesterdayTime, yesterdayIso}
}