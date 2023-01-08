import styles from "./Footer.module.scss"
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.textContent}>
            <p className={styles.author}>MartinMadeIt WalletChart App </p>
            <p className={styles.desc}>App is made for fun, not business. No in app purchase for now. No license. If you are inspired by design or 
            idea - feel free to take pattern. But I'll be glad if give me a star then. If you have any ideas to improve my App or maybe you found some bugs - feel free to contact me under this 
            mail address : marcinvet94@gmail.com</p>

        </div>
        <div className={styles.socials}>
            <a href="#" className={styles.linkedin}><FaLinkedin /></a>
            <a href="#" className={styles.github}><FaGithubSquare /></a>
        </div>
    </div>
  )
}

export default Footer