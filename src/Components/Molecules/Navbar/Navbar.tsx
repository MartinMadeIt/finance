import styles from "./Navbar.module.scss"
import { AiOutlineHome, AiOutlineSmallDash } from "react-icons/ai";
import { CgFramer } from "react-icons/cg";
import { RiArrowGoBackLine } from "react-icons/ri";
import LogoffButton from "../../Atoms/LogoffButton/LogoffButton";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

  const [open, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!open)

  return (
    <>
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <div className={styles.logo__image} />
            <div className={styles.logo__text}>Martin Made IT</div>
        </div>
        <button className={styles.toggle} onClick={handleToggle}>
          <div className={styles.toggle__line} />
          <div className={styles.toggle__line} />
          <div className={styles.toggle__line} />
        </button>
    </div>
    <div className={open ? styles.menu : styles.menu__hidden}>
        <a href="#questionsSect">Questions for you</a>
        <a href="#scienceSect">Science behind money</a>
        <a href="#prosSect">Pros for using App</a>
        <a href="#joinSect">Join us</a>
    </div>
    </>
  )
}

export const NavbarLogged = () => {

  const [open, setOpen] = useState(false)
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
