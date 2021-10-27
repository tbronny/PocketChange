import { getToken } from "./authManager"

const baseUrl = "/api/category"

export const getAllCategories = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("ERROR IN GETTING CATEGORIES")
            }
        })
    })
}

export const getCategoryById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("ERROR GETTING CATEGORY BY ID")
            }
        })
    })
}

export const addCategory = (category) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new category."
                )
            }
        })
    })
}

export const deleteCategory = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
    })
}

export const updateCategory = (category) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${category.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        })
    })
}
