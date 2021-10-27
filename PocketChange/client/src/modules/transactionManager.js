import { getToken } from "./authManager"

const baseUrl = "/api/transaction"

export const getAllTransactions = (budgetId) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/GetByBudget/${budgetId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("ERROR IN GETTING TRANSACTIONS")
            }
        })
    )
}

export const getTransactionById = (id) => {
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
                throw new Error("ERROR GETTING TRANSACTION BY ID")
            }
        })
    })
}

export const addTransaction = (t) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(t),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else if (resp.status === 401) {
                throw new Error("Unauthorized")
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new TRANSACTION."
                )
            }
        })
    })
}

export const deleteTransaction = (id) => {
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

export const updateTransaction = (t) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${t.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(t),
        })
    })
}
