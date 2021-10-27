import React from "react"
import { useHistory } from "react-router"
import { Card, CardBody } from "reactstrap"
import { deleteTransaction } from "../../modules/transactionManager"

const Transaction = ({ transaction }) => {
    const history = useHistory()

    const date = new Date(transaction.date).toLocaleDateString()

    const handleDelete = (evt) => {
        evt.preventDefault()
        if (
            window.confirm(
                `Are you sure you want to delete "${transaction.label}"? Press OK to confirm.`
            )
        ) {
            deleteTransaction(transaction.id).then(window.location.reload())
        } else {
            history.push("/")
        }
    }

    console.log(transaction.label)

    return (
        <Card>
            <CardBody>
                <p>
                    <strong>{transaction.label}</strong>
                </p>
                <p>{transaction.amount}</p>
                <p>{date}</p>
                <button
                    className="btn btn-danger float-right"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className="btn btn-dark float-right"
                    onClick={() => {
                        history.push(`/transaction/edit/${transaction.id}`)
                    }}
                >
                    Edit
                </button>
            </CardBody>
        </Card>
    )
}

export default Transaction
