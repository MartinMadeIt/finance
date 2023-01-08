import { CustomAutocompleteType, CustomInputInterface } from '../../../Utilities/types'
import styles from './Input.module.scss'
import { TextField } from '@mui/material'
import { useAppSelector } from '../../../Redux/hooks';
import { DarkAutocomplete, DarkTextField, LightAutocomplete, LightTextField } from '../../../StylesUtilities/styledComponents';
import { useRef, useState } from 'react';



export function Input<T>({formik, name, type, placeholder, value}:CustomInputInterface<T>) {

  // const darkTheme = useAppSelector((state) => state.darkTheme.darkTheme)

  // if(darkTheme) {
  //   return  (   
  //     <LightTextField
  //       error= {Boolean(formik.touched[name] && formik.errors[name])}
  //       type={type} 
  //       name = {String(name)}
  //       placeholder = {placeholder}
  //       onChange = {formik.handleChange}
  //       onBlur = {formik.handleBlur}
  //       className={styles.input}
  //       value={value}
  //       label={placeholder}
  //     />)
  // } else {
  //   return (
  //     <DarkTextField
  //       error= {Boolean(formik.touched[name] && formik.errors[name])}
  //       type={type} 
  //       name = {String(name)}
  //       placeholder = {placeholder}
  //       onChange = {formik.handleChange}
  //       onBlur = {formik.handleBlur}
  //       className={styles.input}
  //       value={value}
  //       label={placeholder}
  //     />
  //   )
  // }
  return       (  
    <DarkTextField
      error= {Boolean(formik.touched[name] && formik.errors[name])}
      type={type} 
      name = {String(name)}
      placeholder = {placeholder}
      onChange = {formik.handleChange}
      onBlur = {formik.handleBlur}
      className={styles.input}
      value={value}
      label={placeholder}
    />
  )
}

export function SearchInput<T>({name, formik, value, dataset, getValueFromAuto}:CustomAutocompleteType<T>) {

  // const darkTheme = useAppSelector((state) => state.darkTheme.darkTheme)
  const [autoValue, setAutoValue] = useState<string>("")

    return (
      <DarkAutocomplete
        freeSolo
        options={dataset !== undefined ? dataset.map((prof) => prof) : [""]}
        renderInput={(params) => <TextField 
          {...params}
          label={String(name)}
          name={String(name)}
          value={autoValue}
          onChange={(e) => getValueFromAuto(e.target.value)}
          />}
        value={autoValue}
        onChange={(event:any, currValue: string|unknown) => {
          if(typeof currValue === 'string') {
            getValueFromAuto(currValue)
          }
          }}
      />
      )

}



export default Input