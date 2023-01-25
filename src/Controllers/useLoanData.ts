import { useQuery ,useMutation, useQueryClient } from "@tanstack/react-query";
import { LoanStatusType } from "../Utilities/types";
import { fetchLoanDetails, fetchLoanParameter, updateAmountLeft, updateLoanName, updateLoanParameter } from "./databaseActions";

interface getLoanType {
    id: number;
    parameter : string
}

// export const useGetLoan = ({loanIndex}:{loanIndex:string}) => {
//     return useQuery(['loan', loanIndex], () => fetchLoanDetails<LoanStatusType>({id:Number(loanIndex)}))

// }

export const useGetLoanParameter = ({parameter, id}:getLoanType) => {
    return useQuery([parameter], () => fetchLoanParameter<string|number>({parameter:'name', id:id}))
}

export const useEditName = () => {
    const queryClient = useQueryClient()
    return useMutation(updateLoanName, {
        onSuccess: () => {
            queryClient.invalidateQueries()
        }
    })
}

export const useUpdateLeft = () => {
    const queryClient = useQueryClient()
    return useMutation(updateAmountLeft, {
        onSuccess: () => {
            queryClient.invalidateQueries()
        }
    })
}

