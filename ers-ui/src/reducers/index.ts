import { combineReducers } from "redux";
import { User } from "../models/user";
import { loginReducer } from "./login-reducer";

export interface ILoginState {
    user: User
    token: string
}

export interface IState {
    login: ILoginState
}

export const state = combineReducers<IState>({
    login: loginReducer,
})