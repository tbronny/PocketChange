import { getToken } from "./authManager"

const baseUrl = "/api/budget"

export const getAllBudgets = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/GetByMonth`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("ERROR IN GETTING BUDGETS")
            }
        })
    })
}

export const getBudgetById = (id) => {
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
                throw new Error("ERROR GETTING BUDGET BY ID")
            }
        })
    })
}

export const addBudget = (budget) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(budget),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else if (resp.status === 401) {
                throw new Error("Unauthorized")
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new BUDGET."
                )
            }
        })
    })
}

export const deleteBudget = (id) => {
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

export const updateBudget = (budget) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${budget.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(budget),
        })
    })
}
