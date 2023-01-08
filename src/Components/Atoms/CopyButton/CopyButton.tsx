import styles from './CopyButton.module.scss'
import { FiCopy } from "react-icons/fi";

const CopyButton = ({text}:{text:string}) => <button 
    onClick={() => navigator.clipboard.writeText(`${text}`)}
    className={styles.copy}
    ><FiCopy /></button>

export default CopyButton