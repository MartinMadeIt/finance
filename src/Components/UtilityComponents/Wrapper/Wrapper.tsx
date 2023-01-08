import { childrenType } from "../../../Utilities/types"
import styles from "./Wrapper.module.scss"
// import { useAppSelector } from "../../../Redux/hooks"

function Wrapper({children}:childrenType) {

  // const darkTheme = useAppSelector((state) => state.darkTheme.darkTheme)

  return (
    // <div className={!darkTheme ? styles.wrapperLight : styles.wrapperDark}>
    <div className={styles.wrapperLight}>
        {children}
    </div>
  )
}

export default Wrapper