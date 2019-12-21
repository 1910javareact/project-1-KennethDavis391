import { combineReducers } from "redux";
import { User } from "../models/user";
import { loginReducer } from "./login-reducer";
import { navbarReducer } from "./navbar-reducer";

export interface ILoginState {
    user: User
    token: string
}

export interface INavbarState {
    
}

export interface IState {
    login: ILoginState
    navbar: INavbarState
}

export const state = combineReducers<IState>({
    login: loginReducer,
    navbar: navbarReducer,
})