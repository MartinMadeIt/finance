import {  useRef } from "react"
import styles from "./ContentSections.module.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { motion, useInView } from "framer-motion";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ContentFirstSection = ({questionArray}:{questionArray:string[]}) => {
    return (
        <div className={styles.first}>
            <div className={styles.content}>
                <div className={styles.content__image} />
                <div className={styles.content__questions}>
                    {questionArray.map((quest, index) => <p key={index} className={styles.question}>{quest}</p>)}
                    <p className={styles.important}>Where my money goes ?!</p>
                </div> 
            </div>
            <p className={styles.conclusion}>If you ever asked any of this - <span>App is for you !</span></p>
        </div>
    )
}

export const ContentScience = ({factsArray}:{factsArray:string[]}) => {

    const componentScience = useRef(null)
    const isInView = useInView(componentScience, {once: true})

    return (
        <div className={styles.science} ref={componentScience}>
            <motion.div 
                className={styles.science__bulb} 
                style={{
                    transformOrigin: "bottom",
                    transform: isInView ? "rotate(-45deg)" : "none",
                    transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
                }}
                />
            <div className={styles.scienceText}>
                <h3 className={styles.scienceText__header}>Did you know ? </h3>
                {factsArray.map((element, index) => {
                    return <p key={index} className={styles.scienceText__fact}>{element}</p>
                })}
            </div>
        </div>
    )
}

export interface AdvantageType {
    header : string,
    text : string,
    color : string,
    iconUrl : string,
    iconAlt: string
}




export const ContentSectionL = ({text, description, imageUrl, min=false, color='rgba(128, 128, 128, 0.249)'}:{text:string,description:string,  imageUrl:string, min?:boolean, color?:string}) => {
    const shapeColor = {
        backgroundColor: `${color}`
    }

    const componentL = useRef(null)
    const isInView = useInView(componentL, {once: true})

    
    return (
        <motion.div 
            ref={componentL}
            className={styles.sectL}
            style={{
                transform: isInView ? "none" : "translateX(-200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s, opacity 0ms ease-in 0ms"
              }}
            >
            <div className={styles.proText}>
                <h3 className={styles.proText__header}>{text}</h3>
                <p className={styles.proText__description}> {description} </p>
            </div>
            <div className={styles.shape} style={shapeColor}/>
            <img src={imageUrl}  className={styles.proImage}/>
        </motion.div>
    )
}

export const ContentSectionR = ({text, description, imageUrl, min=false, color='rgba(128, 128, 128, 0.249)'}:{text:string, description:string, imageUrl:string, min?:boolean, color?:string}) => {

    const shapeColor = {
        backgroundColor: `${color}`
    }

    const componentR = useRef(null)
    const isInView = useInView(componentR, {once: true})

    return (
        <motion.div 
            ref={componentR}
            className={styles.sectR}
            style={{
                transform: isInView ? "none" : "translateX(200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s, opacity 0ms ease-in 0ms"
            }}
        >
            <div className={styles.proText}>
                <h3 className={styles.proText__header}>{text}</h3>
                <p className={styles.proText__description}>
                    {description}
                </p>
            </div>
            <div className={styles.shape} style={shapeColor} />
            <img src={imageUrl}  className={styles.proImage}/>

        </motion.div>

    )
}


 export const ManageUserStatus = () => {

    const componentManage = useRef(null)
    const isInView = useInView(componentManage, {once: true})

    return (
        <motion.div className={styles.manageContainer} ref={componentManage}>
            <div 
                className={styles.tetxField}
                style={{
                    opacity: isInView ? 1 : 0,
                    transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
                }}>
                <h3 className={styles.textField__main}>Interested ? Join us...</h3>
                <p className={styles.textField__other}>... and start saving money today,</p>
                <p className={styles.textField__other} >... and start being more aware about your budget,</p>
                <p className={styles.textField__other}>... and make your first step to become richer !</p>
            </div>
            <div 
                className={styles.links}
                style={{
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
            >
                <Link to="/login" className={styles.links__login}>
                    <p><FaUserCheck /></p>
                    <p>I'm back</p>
                </Link>
                <Link to="/register" className={styles.links__register}>
                    <p><FaUserPlus /></p>
                    <p>I'm new !</p>
                </Link>
            </div>

        </motion.div>
    )
}