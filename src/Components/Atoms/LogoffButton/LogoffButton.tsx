import styles from "./LogoffButton.module.scss"
import { AiOutlinePoweroff } from "react-icons/ai";
import { useAppDispatch } from "../../../Redux/hooks";
import { logOut } from "../../../Redux/authSlice";
import { signOUT } from "../../../Controllers/loginManage";
import { useNavigate } from "react-router-dom";

const LogoffButton = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOff = async () => {
    await signOUT()
    dispatch(logOut())
    navigate("/")
  }

  return (
    <div className={styles.button} onClick={logOff}><AiOutlinePoweroff /></div>
  )
}

export default LogoffButton;