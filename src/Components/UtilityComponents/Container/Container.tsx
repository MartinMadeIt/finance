import { childrenType } from "../../../Utilities/types"
import styles from "./Container.module.scss"



export interface ContainerLayoutOptions {
    layout?: 'flex-center' | 'flex-space-between' | 'flex-space-evenly',
    responsive?: boolean
}

/*         Container modules used for wrapping elements in component          */

export const ContainerColumn = ({children}:childrenType) =>  <div className={styles.column}>{children}</div>

export const ContainerRow = ({children}:childrenType) =>  <div className={styles.row}>{children}</div>




