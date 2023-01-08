import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { tileDown, tileUp } from "../../../StylesUtilities/framerVariants"
import { NavbarLogged } from "../../Molecules/Navbar/Navbar"
import styles from "./HomePage.module.scss"



function HomePage() {


  return (
    <div className={styles.container}>
      <NavbarLogged />
      
      <div className={styles.bg}>
        <div className={styles.loggedContent}>
          <p className={styles.marker}>.</p>
          <motion.div
            className={styles.expLink}
            variants={tileUp}
            initial="initial"
            animate="inView"
            >
            <Link to={'/expenditures'} className={styles.expCard}>
              <div className={styles.expImg} />
              <div className={styles.textCard}>
                <p className={styles.cardHeader}>Expenditures</p>
                <p className={styles.cardDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, 
                rem. Magnam, nisi? Provident eveniet saepe itaque at. Sed et consequuntur, tenetur, illo nam sit 
                quos ab magni facilis, necessitatibus earum.</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            className={styles.loanLink}
            variants={tileDown}
            initial="initial"
            animate="inView"
          >
            <Link to={'/loan'} className={styles.loanCard}>
              <div className={styles.loanImg} />
              <div className={styles.textCard}>
                <p className={styles.cardHeader}>Loan Tracker</p>
                <p className={styles.cardDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, 
                rem. Magnam, nisi? Provident eveniet saepe itaque at. Sed et consequuntur, tenetur, illo nam sit 
                quos ab magni facilis, necessitatibus earum.</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HomePage