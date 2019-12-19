import { INavbarState } from ".";
import { navbarTypes } from "../action-mappers/navbar-action-mappers";


const initialState: INavbarState = {
    userId: 0
}

export const navbarReducer = (state = initialState, action:any) =>{    
    console.log(action.type)
    switch (action.type){
        case navbarTypes.USER_ID_CHANGED :{
            console.log('got through with action type');
            
            return{
            ...state,
            userId: action.payload.userId
            }
        }
        default:{
            return state
        }
    }
}