import React, { useEffect, useState } from "react"
import Transaction from "./Transaction"
import { getAllTransactions } from "../../modules/transactionManager"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const TransactionList = () => {
    const [transactions, setTransactions] = useState([])
    const { budgetId } = useParams()

    const getTransactions = () => {
        getAllTransactions(budgetId).then((t) => setTransactions(t))
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <div className="container">
            <Link to={`/transaction/add?budgetId=${budgetId}`}>
                <button>add transaction</button>
            </Link>
            <div className="row justify-content-center">
                {transactions.map((transaction) => (
                    <Transaction
                        transaction={transaction}
                        key={transaction.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default TransactionList
