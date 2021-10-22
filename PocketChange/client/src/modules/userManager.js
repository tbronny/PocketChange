import { getToken } from "./authManager"

const apiUrl = "/api/user"

export const getAllUsers = () => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("Error in retreiving users")
            }
        })
    })
}
