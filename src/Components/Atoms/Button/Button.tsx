// import { useAppSelector } from "../../../Redux/hooks"
import { ButtonType } from "../../../Utilities/types"
import styles from "./Button.module.scss"
// import darkStyles from "./ButtonDark.module.scss"



function Button({text, type, style='danger'}:ButtonType) {

//   const darkTheme = useAppSelector((state) => state.darkTheme.darkTheme)

    return (
        <button
            type={type}
            // className={darkTheme ? darkStyles[style] : styles[style]}
            className={styles[style]}
        >
            {text}
        </button>
    )
}

export default Button