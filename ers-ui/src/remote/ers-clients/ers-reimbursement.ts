import {ersUserClient} from './ers-client'

export async function ersGetReimbursementsById(userId: number, token: string){
    const tokenHeader = {
        headers: {
            token: token,
        }
    }

    try{
        const response = await ersUserClient.get('/reimbursements/author/userId/' + userId, tokenHeader)
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

export async function ersSubmitReimbursement(userId: number, amount: number, type: number, description: String, token: String){
    const body = {
        userId,
        amount,
        type,
        description,
    }
    
    const tokenHeader = {
        headers: {
            token: token,
        }
    }

    try{
        const response = await ersUserClient.post('/reimbursements',body, tokenHeader)
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

export async function ersGetReimbursementsByStatus(status: number, token: string){
    
    const tokenHeader = {
        headers: {
            token: token,
        }
    }

    try{
        const response = await ersUserClient.get('/reimbursements/status/' + status, tokenHeader)
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