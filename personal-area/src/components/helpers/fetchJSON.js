export const fetchJSON = async (url, reqParams) => {
    let response = reqParams === null ?
        await fetch(url) :
        await fetch(url, reqParams)

    if (response.status === 200 || response.status === 201) {
        return response.json()
    } else {
        throw Error(response.statusText)
    }
}