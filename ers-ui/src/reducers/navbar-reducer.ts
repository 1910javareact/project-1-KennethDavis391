import { INavbarState } from ".";
import { navbarTypes } from "../action-mappers/navbar-action-mappers";


const initialState: INavbarState = {
    
}

export const navbarReducer = (state = initialState, action:any) =>{    
    switch (action.type){
        case navbarTypes.STATE_CLEARED :{            
            return{
            
            }
        }
        default:{
            return state
        }
    }
}