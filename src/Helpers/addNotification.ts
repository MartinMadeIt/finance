import { Store, iNotification,NOTIFICATION_TYPE } from 'react-notifications-component'

const staticProps:iNotification={
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__bounceIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
          duration: 4000,
          onScreen: true
          }
        }

export const showNotification=(title:string,message:string,type:NOTIFICATION_TYPE)=> {
        Store.addNotification({
          title: title,
          message: message,
          type: type,
          ...staticProps
        })
    }