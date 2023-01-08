import { useAppDispatch, useAppSelector } from "../../../Redux/hooks"
import styles from "./ButtonChange.module.scss"
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { changeTheme } from "../../../Redux/themeSlice";
import { ButtonHTMLAttributes } from "react";

const ButtonChange = () => {
    
    const darkTheme = useAppSelector((state) => state.darkTheme.darkTheme)
    const dispatch = useAppDispatch();

    const handleTheme = () => dispatch(changeTheme())

    return (
        <button
            className={darkTheme ? styles.buttonLight : styles.buttonDark} 
            onClick={handleTheme}>
            {darkTheme ? <BsSunFill /> : <BsMoonStarsFill />}
        </button>
    )
}

export default ButtonChange