export const setUser = (user) => ({
    type: "SET_USER",
    payload: {name: user.name, login: user.login, password: user.password, email: user.email}
})
