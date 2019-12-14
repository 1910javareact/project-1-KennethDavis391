import {ersUserClient} from './ers-user-client'

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