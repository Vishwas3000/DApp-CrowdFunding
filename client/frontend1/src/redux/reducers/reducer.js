import {ActionType} from '../contants/actionType' ; 

const iniState = [{
    name : "bhai" , 
    no : 15 , 
},] ; 

export const fundrsReducer = (state = iniState , {type , payload} ) => {
      switch (type) {
          case ActionType.SET_FUNDRS : 
            return {...state , fundrs : payload} ;

          default : 
            return state ;    
      }

    }
 const ini = {} ; 
export const fundrReducer = (state = ini , {type , payload} ) => {
  switch (type) {
      case ActionType.SET_FUNDR: 
        return {...state , fundr : payload} ;

      default : 
        return state ;    
  }
}

const auth = {
     token : localStorage.getItem("token"),
     userid : localStorage.getItem("userid"),
     state  :false
}
export const authReducer = (state  =  auth, {type , payload}) =>{
  switch (type) {
    case ActionType.SET_AUTH: 
      return {...state , fundr : payload} ;

    default : 
      return state ;    
}
}