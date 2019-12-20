export const navbarTypes = {
    USER_ID_CHANGED: 'USER_ID_CHANGED'
}

export const changeUserId = (userId: number) => {    
    return{
        type: navbarTypes.USER_ID_CHANGED,
        payload: {
            userId
        }
    }
}