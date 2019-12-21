import {ersUserClient} from './ers-client'
import { User } from '../../models/user'

export async function ersUserLogin(username:string, password:string){
    const credentials = {
        username,
        password
    }
    try{
        const response = await ersUserClient.post('/login', credentials)
        if(response.status === 200){
            return{
                status: response.status,
                body: response.data,
                header: response.headers
            }
        }else{
            return {
                status: response.status,
                body: undefined
            }
        }
    }catch(e){
        console.log(e);
        throw new Error('Something Went Wrong')
    }
}

export async function ersGetUserById(userId: number, token: string){
    const tokenHeader = {
        headers: {
            token: token,
        }
    }

    try{
        const response = await ersUserClient.get('/users/' + userId, tokenHeader)
        if(response.status === 200){
            return{
                status: response.status,
                body: response.data,
                header: response.headers
            }
        }else{
            return {
                status: response.status,
                body: undefined
            }
        }
    }catch(e){
        console.log(e);
        throw new Error('Something Went Wrong')
    }
}

export async function ersGetAllUsers(token: string) {
    const tokenHeader = {
        headers:{
            token: token,
        }
    }

    try{
        const response = await ersUserClient.get('/users',tokenHeader)
        if(response.status === 200){
            return{
                status: response.status,
                body: response.data,
                header: response.headers
            }
        }else{
            return{
                status: response.status,
                body: undefined
            }
        }
    }catch(e){
        console.log(e);
        throw new Error('Something Went Wrong')
    }
}

export async function ersUpdateUser(user: User, token: String){
    const body = {
        userId: user.userId,
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles
    }

    const tokenHeader = {
        headers:{
            token:token
        }
    }

    try{
        const response = await ersUserClient.patch('/users',body,tokenHeader)
        if(response.status === 200){
            return{
                status: response.status,
                body: response.data,
                header: response.headers
            }
        }else{
            return{
                status: response.status,
                body: undefined
            }
        }
    }catch(e){
        console.log(e);
        throw new Error('Something Went Wrong')
    }
}