export const navbarTypes = {
    STATE_CLEARED: 'STATE_CLEARED'
}

export const clearState = () => {    
    return{
        type: navbarTypes.STATE_CLEARED,
        payload: {
        }
    }
}