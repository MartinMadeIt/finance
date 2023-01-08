import CircularBar from "../../Atoms/CircularProgressBar/Circular"
import styles from "./LoanTracker.module.scss"

export const LoanView  = ({name, totalAmount, amountLeft, colour}:{name:string, totalAmount:number, amountLeft:number, colour:string}) => {

    const percentOfPaid = (totalAmount - Number(amountLeft))/totalAmount*100
  
    return (
      <div className={styles.loanCard} style={{backgroundColor: `rgba(${colour}, 0.15)`}}>
        <CircularBar percent={percentOfPaid} colour={`rgb(${colour})`} />
        <p className={styles.name}>{name}</p>
      </div>
    )
  }