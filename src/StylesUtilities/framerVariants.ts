export const tileUp = {
    initial : {
      y: "-100vh",
      opacity : 0
    },
    inView : {
      y : 0,
      opacity : 1,
  
      transition : {
        delay : 0.2,
        duration: 1,
        type: "spring"
      }
    }
  }
  
  export const tileDown = {
    initial : {
      y: "100vh",
      opacity : 0
    },
    inView : {
      y : 0,
      opacity : 1,
  
      transition : {
        delay : 0.2,
        duration: 1,
        type: "spring"
  
      }
    }
  }