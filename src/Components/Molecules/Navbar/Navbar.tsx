import styles from "./Navbar.module.scss"
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineHome, AiOutlineSmallDash } from "react-icons/ai";
import { CgFramer } from "react-icons/cg";
import { RiArrowGoBackLine } from "react-icons/ri";
import LogoffButton from "../../Atoms/LogoffButton/LogoffButton";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux/hooks";


export default function Navbar() {
  return (
    <div className={styles.container}>
        <div className={styles.logoField}>
            <div className={styles.logo} />
            <div className={styles.companyName}>Martin Made IT</div>
        </div>
        <div className={styles.hamburger}><HiMenuAlt3 /></div>
    </div>
  )
}

export const NavbarLogged = () => {

  const [open, setOpen] = useState(false)
  const [percent, setPercent] = useState(0)
  const [enableAnimations, setEnableAnimations] = useState(true)

  const navigate = useNavigate()
  


  return(
    <motion.div 
      className={styles.containerLogged}
      initial={false}
      animate={!open ? {y:"-150px"} : {y:0}}
      transition={{type:"tween"}}
    >
      <div className={styles.console} >
          <LogoffButton />
          <button 
            className={enableAnimations ? styles.animationsBtn : styles.noanimationsBtn}
            onClick={()=>setEnableAnimations(!enableAnimations)}
            ><CgFramer />
          </button>
          <button 
            className={styles.backBtn}
            onClick={()=>navigate("../")}
            ><RiArrowGoBackLine />
          </button>
          <button 
            className={styles.home}
            onClick={()=>navigate("/")}
            ><AiOutlineHome />
          </button>
      </div>
      <div className={styles.arrow} onClick={() => {setOpen(!open)}}>
        <AiOutlineSmallDash />
      </div>

    </motion.div>
  )
}
