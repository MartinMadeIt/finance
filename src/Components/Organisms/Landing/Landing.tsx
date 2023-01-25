import { useScroll, motion, useSpring } from "framer-motion"
import { useEffect } from "react"
import { getUSER } from "../../../Controllers/loginManage"
import { logIn, logOut } from "../../../Redux/authSlice"
import { useAppDispatch } from "../../../Redux/hooks"
import { ContentFirstSection, ContentScience, ContentSectionL, ContentSectionR, ManageUserStatus } from "../../Molecules/ContentSections/ContentSections"
import Footer from "../../Molecules/Footer/Footer"
import Navbar from "../../Molecules/Navbar/Navbar"
import styles from "./Landing.module.scss"
import { TEXT_CONTENT } from "./textForContent"
import ToTop from "../../Atoms/ToTop/ToTop"


function Landing() {
    
        const { scrollYProgress } = useScroll()
        const scaleX = useSpring(scrollYProgress, {
            stiffness: 70,
            damping: 20,
            restDelta: 0.001
        })

    const dispatch = useAppDispatch();

    const checkLoginStatus = async () => getUSER().then(data => data?.id ? dispatch(logIn()) : dispatch(logOut()))

    useEffect(() => {
        checkLoginStatus()
    }, [])

  return (
    <div className={styles.container}>
        <Navbar />
        <ToTop />
        <motion.div 
            style={{ scaleX }} 
            className={styles.progress}
        />
        <div className={styles.content}>

            <section className={styles.content__questions} id="questionsSect">
                <ContentFirstSection questionArray={TEXT_CONTENT.questionArray} />
            </section>

            <section className={styles.content__science} id="scienceSect">
                <ContentScience factsArray={TEXT_CONTENT.scienceArray} />
            </section>


            <section className={styles.content__pros} id='prosSect'>
                <ContentSectionL 
                    text={TEXT_CONTENT.charts.title} 
                    description={TEXT_CONTENT.charts.text}
                    imageUrl={TEXT_CONTENT.charts.imageUrl}
                    color={TEXT_CONTENT.charts.bgColor}
                />

                <ContentSectionR
                    text={TEXT_CONTENT.free.title} 
                    description={TEXT_CONTENT.free.text}
                    imageUrl={TEXT_CONTENT.free.imageUrl}
                    color={TEXT_CONTENT.free.bgColor}
                    min
                />

                <ContentSectionL 
                    text={TEXT_CONTENT.timeline.title} 
                    description={TEXT_CONTENT.timeline.text}
                    imageUrl={TEXT_CONTENT.timeline.imageUrl}
                    color={TEXT_CONTENT.timeline.bgColor}
                    min
                />
            </section>

            <section className={styles.content__join} id="joinSect">
                <ManageUserStatus />
            </section>
                
        </div>
        <Footer />
    </div>
  )
}

export default Landing

