import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import { getAllBudgets, getBudgetById } from "../../modules/budgetManager"
import {
    addTransaction,
    getTransactionById,
    updateTransaction,
} from "../../modules/transactionManager"

const TransactionForm = () => {
    const [transaction, setTransaction] = useState({})
    const [categories, setCategories] = useState([])
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const transactionId = params.id

    useEffect(() => {
        getAllBudgets().then(() => {
            if (transactionId) {
                getTransactionById(transactionId).then((transaction) => {
                    setTransaction(transaction)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const handleInputChange = (evt) => {
        const value = evt.target.value
        const key = evt.target.id

        const transactionCopy = { ...transaction }

        transactionCopy[key] = value
        setTransaction(transactionCopy)
    }

    const handleSave = (evt) => {
        evt.preventDefault()
        setIsLoading(true)
        if (transactionId) {
            updateTransaction({
                id: parseInt(transactionId),
                label: transaction.label,
                notes: transaction.notes,
                amount: parseFloat(transaction.amount),
                date: transaction.date,
                categoryId: transaction.categoryId,
                budgetId: transaction.budgetId,
            }).then(() =>
                history.push(`/transaction/GetByBudget/${transaction.budgetId}`)
            )
        } else {
            addTransaction({
                label: transaction.label,
                notes: transaction.notes,
                amount: parseFloat(transaction.amount),
                date: transaction.date,
                categoryId: transaction.categoryId,
                budgetId: transaction.budgetId,
            }).then(() =>
                history.push(`/transaction/GetByBudget/${transaction.budgetId}`)
            )
        }
    }

    return (
        <Form>
            <FormGroup>
                <Label for="label">Label</Label>
                <Input
                    type="text"
                    name="label"
                    id="label"
                    placeholder="Where did you spend this money..."
                    value={transaction.label}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                    type="text"
                    name="notes"
                    id="notes"
                    placeholder="Anything to note..."
                    value={transaction.notes}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="0"
                    value={transaction.amount}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="date">Date</Label>
                <Input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="When was this transaction..."
                    value={transaction.date}
                    onChange={handleInputChange}
                />
            </FormGroup>
            {/* <FormGroup>
                <Label for="category">Category</Label>
                <select
                    name="categoryId"
                    id="categoryId"
                    className="form-control"
                    value={transaction.categoryId}
                    onChange={handleInputChange}
                >
                    <option value="0">Select a category</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </FormGroup> */}
            <Button
                className="btn btn-primary"
                disable={isLoading}
                onClick={handleSave}
            >
                {transactionId ? "Save" : "Submit"}
            </Button>
        </Form>
    )
}

export default TransactionForm
