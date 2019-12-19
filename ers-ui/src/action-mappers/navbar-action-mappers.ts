export const navbarTypes = {
    USER_ID_CHANGED: 'USER_ID_CHANGED'
}

export const changeUserId = (userId: number) => {
    console.log('ran the action mapper');
    
    return{
        type: navbarTypes.USER_ID_CHANGED,
        payload: {
            userId
        }
    }
}