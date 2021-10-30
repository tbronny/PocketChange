import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { Card, CardBody } from "reactstrap"
import { deleteBudget } from "../../modules/budgetManager"
import { getAllTransactions } from "../../modules/transactionManager"

const Budget = ({ budget }) => {
    // const [transactions, setTransactions] = useState([])
    const history = useHistory()

    // useEffect(() => {
    //     getAllTransactions(budget.id).then((t) => setTransactions(t))
    // }, [])

    // const transAmount = transactions.map((t) => {
    //     return t.amount
    // })

    // for (let i = 0; i < transAmount.length; i++) {
    //     budget.total += transAmount[i]
    // }

    const handleDelete = (evt) => {
        evt.preventDefault()
        if (
            window.confirm(
                `Are you sure you want to delete "${budget.label}"? Press OK to confirm.`
            )
        ) {
            deleteBudget(budget.id).then(window.location.reload())
        } else {
            history.push("/")
        }
    }

    return (
        <Card>
            <CardBody>
                <p>
                    <Link to={`/transaction/GetByBudget/${budget.id}`}>
                        <strong>{budget.label}</strong>
                    </Link>
                </p>
                <p>{budget.monthlyGoal}</p>
                <p>{budget.transactions?.map((t) => t.label)}</p>
                <button
                    className="btn btn-danger float-right"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className="btn btn-dark float-right"
                    onClick={() => {
                        history.push(`/budget/edit/${budget.id}`)
                    }}
                >
                    Edit
                </button>
            </CardBody>
        </Card>
    )
}

export default Budget
