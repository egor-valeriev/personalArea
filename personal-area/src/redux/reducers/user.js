const initialState = {
    name: '',
    login: '',
    email: '',
    password: ''
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                name: action.payload
            };
        default:
            return state;
    }
};