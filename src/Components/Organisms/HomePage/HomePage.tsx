import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { tileDown, tileUp } from "../../../StylesUtilities/framerVariants"
import { NavbarLogged } from "../../Molecules/Navbar/Navbar"
import styles from "./HomePage.module.scss"



function HomePage() {


  return (
    <div className={styles.home}>
      <NavbarLogged />
      
      <div className={styles.background}>
        <div className={styles.content}>
          <p className={styles.marker}>.</p>
          <motion.div
            className={styles.content__expenditures}
            variants={tileUp}
            initial="initial"
            animate="inView"
            >
            <Link to={'/expenditures'} className={styles.card}>
              <div className={styles.card__image} />
              <div className={styles.card__text}>
                <h3 className={styles.card__header}>Expenditures</h3>
                <p className={styles.card__description}>Track your expenditures. Remember to fill data every day for better statistics of your expenditures.</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            className={styles.content__loan}
            variants={tileDown}
            initial="initial"
            animate="inView"
          >
            <Link to={'/loan'} className={styles.card}>
              <div className={styles.card__image} />
              <div className={styles.card__text}>
                <p className={styles.card__header}>Loan Tracker</p>
                <p className={styles.card__description}>Do you have some loans ? Add them to track, give them a payment info and track your payment history and how much to pay left !</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HomePage