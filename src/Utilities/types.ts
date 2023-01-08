import { FormikProps } from "formik";
import React from "react";

export type childrenType = {children: React.ReactNode}

export type ClickEventFormType = React.FormEvent<HTMLFormElement>

export type ClickEventButtonType = React.MouseEvent<HTMLButtonElement, MouseEvent>

export interface CustomInputInterface <T>{
    formik:FormikProps<T>,
    name: keyof T,
    type: 'text' | 'password' | 'number',
    placeholder: string
    value?:string
}

export interface CustomAutocompleteType <T>{
    formik:FormikProps<T>,
    name: keyof T,
    value:string,
    dataset: string[]|undefined,
    getValueFromAuto:any

}

export interface ButtonType {
    text: string,
    type: 'button'|'submit'|'reset',
    style: 'danger'|'wrong'|'info'|'success'
}

export interface Users {
    id: number   /* primary key */;
    created_at?: string;
    username: string;
    profession: string;
    user_id: string;
  };
  
//   export interface LoanStatusType {
//     loan_id: number   /* primary key */;
//     amount_left: number;
//     owner: string   /* foreign key to users.user_id */;
//     start_date: string;
//     total_amount: any // type unknown;
//     name: string;
//     colour: string;
//     account_number: string;
//     users?: Users;
//   };


export interface LoanStatusType {
    loan_id: number   /* primary key */;
    amount_left: number;
    owner: string   /* foreign key to users.user_id */;
    start_date: string;
    total_amount: any // type unknown;
    name: string;
    colour: string;
    account_number: string;
    title_for_transfer: string;
    users?: Users;
  };
  
  
  export interface CategoriesType {
    category_id: number   /* primary key */;
    name?: string;
  };
  
  export interface SpentType {
    spent_id: number   /* primary key */;
    created_at?: string;
    category_id?: number   /* foreign key to categories.category_id */;
    user_id: string   /* foreign key to users.user_id */;
    amount: number;
    categories?: CategoriesType;
    users?: Users;
  };
  
  export interface CreditHistoryType {
    history_id: number   /* primary key */;
    spent_id: number   /* foreign key to spent.spent_id */;
    loan_id: number;
    spent?: SpentType;
  };
  