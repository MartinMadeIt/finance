import styles from "./QuickSettings.module.scss"
import { VscSettings } from "react-icons/vsc";
import { useAppSelector } from "../../../Redux/hooks";
import { useState } from "react";
import ButtonChange from "../../Atoms/ButtonChange/ButtonChange";

function QuickSettings() {

  const darkTheme = useAppSelector((state) => state.darkTheme.darkTheme)
  const [clicked, setClicked] = useState(false)

    return (
        <div className={darkTheme ? styles.handleDark : styles.handleLight}>
            {!clicked ? <button onClick={() => setClicked(!clicked)} className={styles.showhide}><VscSettings /></button>: 
            <>
            <button onClick={() => setClicked(!clicked)} className={styles.showhide}><VscSettings /></button>
            <ButtonChange />
            <p>G</p>
            </>}
        </div>
    )
}

export default QuickSettings