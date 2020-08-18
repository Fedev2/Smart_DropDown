const initialState = {
    status: '500'
}

const reducer = (state = initialState, action) => {
    const newState = {...state}
    if (action.type === 'Update status') {
        newState.status = '200' 
    }
    if (action.type === 'Init status') {
        newState.status = '500' 
    }    
    return newState
}

export default reducer