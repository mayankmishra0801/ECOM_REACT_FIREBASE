// eslint-disable-next-line no-unused-vars
import React from 'react'
import MyContext from './myContext'
const myState = (props) => {


    const state = {
                name:"Mayank",
                rollno:20
            }
        
          return (
        
        
            <MyContext.Provider value={state}>
              
                 
                 {props.children}
        
        
            </MyContext.Provider>
        
          
        
        )




 
}

export default myState