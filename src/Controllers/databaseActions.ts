import { useState } from "react";
import { supabase } from "../Utilities/supabaseClient";
import { CategoriesType } from "../Utilities/types";


//      CREATE NEW CREDIT
export const createNewLoan = async ({amount, nameOfLoan, user, colour, accountNumber, transferTitle}:
    {amount: number, nameOfLoan:string , user:string, colour:string, accountNumber?:string, transferTitle?:string}) => {
    const { data, error } = await supabase
        .from('loanStatus')
        .insert([
        { 
            total_amount: amount, 
            amount_left: amount, 
            name: nameOfLoan, 
            owner: user, 
            colour: colour, 
            account_number: accountNumber,
            title_for_transfer: transferTitle
        },
        ])
    return data
}

//      LOAN ACTIONS
//          Fetch IDs of loans for specific owner

export async function fetchLoanIds<T>({userID}:{userID:string}) {
    let { data: loanStatus, error } = await supabase
    .from('loanStatus')
    .select('loan_id')
    .eq('owner', userID)
    console.log(loanStatus);
    
    return loanStatus as T
}

//          Fetch loans that match to owner
export async function fetchLoanDatas<T>({id}:{id:string}) { 

        let { data: loanStatus, error } = await supabase
        .from('loanStatus')
        .select('*')
        .eq('owner', id)

        return loanStatus as T
}

//          Fecth loan datas based on loan_id
export async function fetchLoanDetails<T>({id, userId}:{id:number, userId:string}) { 

        let { data: loanStatus, error } = await supabase
        .from('loanStatus')
        .select('*')
        .eq('loan_id', id)
        .eq('owner', userId)
        .single()

        return loanStatus as T
}

//          Fecth loan parameter based on loan_id
export async function fetchLoanParameter<T>({id, parameter}:{id:number, parameter:string}) { 

        const { data: loanStatus, error } = await supabase
            .from('loanStatus')
            .select(`${parameter}`)
            .eq('loan_id', id)
            .single()

        return loanStatus as T
}

//          Edit loan name
export async function updateLoanName({columnValue, newValue}:{columnValue:string, newValue:string}) {
    const { data, error } = await supabase
        .from('loanStatus')
        .update({ name: `${newValue}` })
        .eq('name', `${columnValue}`)
    
    return data
}
//          Edit loan name
export async function updateLoanParameter({columnValue, newValue, parameter}:{columnValue:string, newValue:string, parameter:string}) {
    const { data, error } = await supabase
        .from('loanStatus')
        .update({ parameter: `${newValue}` })
        .eq(`${parameter}`, `${columnValue}`)
    
    return data
}

//          DELETE Loan
export async function deleteLoan({loanId}:{loanId:number}) {

    const { data, error } = await supabase
        .from('loanStatus')
        .delete()
        .eq('loan_id', loanId)
    return data
}

//      UPDATE Loan Amount__Left
export async function updateAmountLeft({loanId, newValue}:{loanId:number, newValue:number}) {
        
    const { data, error } = await supabase
        .from('loanStatus')
        .update({ amount_left: newValue})
        .eq('loan_id', loanId)
    return data;

}


//      Select rows form SPENT table by user_id
export async function getUserSpendings<T>({userId}:{userId:string}) {

    const { data: spent, error } = await supabase
    .from('spent')
    .select('*')
    .eq('user_id', userId)

    return spent as T
}

//      Update user spendings after paid installment and return s
export async function createSpendingAfterLoanPay<T>({userId, installment, date}:{userId:string, installment:number, date:string}) {

    const { data, error } = await supabase
        .from('spent')
        .insert([
        { user_id: userId, amount: installment, category_id : 8, created_at: date },
        ])
        .select()
        .single()

    return data as T;
}

//      Update creditHistory table after paying installment
export async function updateCreditHistory({loanId, spentId}:{loanId:number, spentId:number}) {

    const { data, error } = await supabase
        .from('creditHistory')
        .insert([
        { loan_id: loanId, spent_id: spentId },
        ])

    return data;
}

//      get Hisotry of loan
export async function getHistory<T>({loanId}:{loanId:number}) {

    const { data: creditHistory, error } = await supabase
        .from('creditHistory')
        .select('*')
        .eq('loan_id', loanId)
    
    return creditHistory as T
}

//         get all spent_id's based on current loan_id
export async function getSpentIdsByLoanId<T>({loanId}:{loanId:number}) {

    const { data: spentIds, error } = await supabase
        .from('creditHistory')
        .select(`
        spent_id,
        loanStatus (
            loan_id
        )
        `)
        .eq('loan_id', loanId)

    return spentIds as T
}


//      get amount and date from spent using creditHistory
export async function getAmountBySpent<T>({id}:{id:number}) {

    const { data: creditHistory, error } = await supabase
        .from('spent')
        .select(`
            amount,
            created_at,
            creditHistory (
                spent_id
            )
            `)
        .eq('spent_id', id)
        .single()

    return creditHistory as T
}

//      get amount and date from spent using spen_id array
export async function getHistoryDetails<T>({ids}:{ids:number[]}) {

    const { data: creditHistory, error } = await supabase
        .from('spent')
        .select(`
            amount,
            created_at,
            creditHistory (
                spent_id
            )
            `)
        .in('spent_id', ids)
        .order('created_at', { ascending: false })

    return creditHistory as T
}


//      get SPENT based on user_id
export async function getSpent({userId}:{userId:string}) {
    const { data: spent, error } = await supabase
      .from('spent')
      .select(`
      *,
      categories(
        category_id,
        name
      )`)
      .eq('user_id', userId)

      return spent
}

//      get list of categories
export async function getCategories<T>() {

    const { data: categories, error } = await supabase
    .from('categories')
    .select('name')

    return categories as T
}

export async function getCategoryName<T> ({categoryName}:{categoryName:string}) {
    const { data: categoryId } = await supabase
        .from('categories')
        .select('category_id')
        .eq('name', categoryName)
        .single()

    return categoryId as T
}


//      create spending
export interface CreateSpendingInterface {
    amount: number,
    userId: string, 
    categoryName: string,
    catNames: string[]
}

interface categoryType {
    category_id : number
}


export async function insertSpending ({...props}:CreateSpendingInterface) {

    if(props.catNames.includes(props.categoryName)){
        const catId = await getCategoryName<categoryType>({categoryName: props.categoryName})
        const { data } = await supabase
            .from('spent')
            .insert([
            { user_id: props.userId, category_id: catId?.category_id, amount: props.amount },
            ])

        return data
    } else {
        const newCategory = await insertCategory<CategoriesType>({categoryName: props.categoryName})
        const { data } = await supabase
        .from('spent')
        .insert([
        { user_id: props.userId, category_id: newCategory.category_id, amount: props.amount },
        ])
        console.log(newCategory.category_id)
    return data
    }

    // const { data, error } = await supabase
    //     .from('spent')
    //     .insert([
    //     { user_id: props.userId, category_id: props.categoryName, amount: props.amount },
    //     ])
    
}



//      rpc function to get distinct cat name with total amount
export async function getTotalForCategory<T>({userId}:{userId:string}) {
    const {data} = await supabase
        .rpc('getamount', {'userid': userId})
    return data as T
}


//      get total expenditures
interface TotalType {
    userId:string,
    dateStart : string,
    dateEnd: string
}

export async function getTotalExpenditures({...props}:TotalType){
    const { data, error } = await supabase
    .rpc('totalexpenditures', {
    'userid': props.userId,
    'datestart': props.dateStart,
    'dateend': props.dateEnd

    })
    return data 
}

//      get total expenditures based on : user_id and date interval
interface ExpendByDateProps {
    userId : string, 
    dateStart : string,
    dateEnd : string
}
export async function getCategoriesAmountByDate<T>({...props}:ExpendByDateProps){
    const { data, error } = await supabase
    .rpc('getexpbydate', {
    'userid': props.userId,
    'datestart' : props.dateStart,
    'dateend' : props.dateEnd
    })
    return data as T
}

//      create new CATEGORY
export async function insertCategory<T>({categoryName}:{categoryName:string}) {

    const { data } = await supabase
        .from('categories')
        .insert([
        { name: categoryName },
        ])
        .select()
        .single()
    return data as T

}