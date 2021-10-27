import React from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { Card, CardBody } from "reactstrap"
import { deleteBudget } from "../../modules/budgetManager"

const Budget = ({ budget }) => {
    const history = useHistory()

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
                <p>{budget.total}</p>
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
