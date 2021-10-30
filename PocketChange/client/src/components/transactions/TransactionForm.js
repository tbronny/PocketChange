import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import {
    TextField,
    Typography,
    Input,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core"
import { getAllBudgets, getBudgetById } from "../../modules/budgetManager"
import { getAllCategories } from "../../modules/categoryManager"
import {
    addTransaction,
    getTransactionById,
    updateTransaction,
} from "../../modules/transactionManager"
import transitions from "@material-ui/core/styles/transitions"

const TransactionForm = () => {
    const [transaction, setTransaction] = useState({})
    const [budgets, setBudgets] = useState([])
    let query = new URLSearchParams(document.location.search.substring(1))
    const [categories, setCategories] = useState([])
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const transactionId = params.id

    useEffect(() => {
        if (transactionId) {
            getTransactionById(transactionId).then((transaction) => {
                setTransaction(transaction)
                setIsLoading(false)
            })
        }
        getAllCategories().then(setCategories)
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
                isExpense: transaction.isExpense,
                categoryId: transaction.categoryId,
                budgetId: transaction.budgetId,
            }).then(() =>
                history.push(`/transaction/GetByBudget/${transaction.budgetId}`)
            )
        } else {
            if (transaction.isExpense === "true") {
                addTransaction({
                    label: transaction.label,
                    notes: transaction.notes,
                    amount: parseFloat(transaction.amount * -1),
                    date: transaction.date,
                    isExpense: JSON.parse(transaction.isExpense),
                    categoryId: parseInt(transaction.categoryId),
                    budgetId: parseInt(query.get("budgetId")),
                }).then(() =>
                    history.push(
                        `/transaction/GetByBudget/${query.get("budgetId")}`
                    )
                )
            } else if (transaction.isExpense === "false") {
                addTransaction({
                    label: transaction.label,
                    notes: transaction.notes,
                    amount: parseFloat(transaction.amount),
                    date: transaction.date,
                    isExpense: JSON.parse(transaction.isExpense),
                    categoryId: parseInt(transaction.categoryId),
                    budgetId: parseInt(query.get("budgetId")),
                }).then(() =>
                    history.push(
                        `/transaction/GetByBudget/${query.get("budgetId")}`
                    )
                )
            }
        }
    }

    return (
        <Grid container spacing={0}>
            {/* <Grid item xs={3}> */}
            <FormControl fullWidth>
                <InputLabel for="isExpense">Type</InputLabel>
                <select
                    name="expense"
                    id="isExpense"
                    value={transaction.isExpense}
                    onChange={handleInputChange}
                >
                    <option value="false">Income</option>
                    <option value="true">Expense</option>
                </select>
            </FormControl>
            {/* </Grid>
            <Grid item xs={3}> */}
            <FormControl fullWidth>
                <InputLabel for="label">Purchase Location</InputLabel>
                <Input
                    type="text"
                    name="label"
                    id="label"
                    placeholder="Walmart?"
                    value={transaction.label}
                    onChange={handleInputChange}
                />
            </FormControl>
            {/* </Grid>
            <Grid item xs={3}> */}
            <FormControl fullWidth>
                <InputLabel for="notes">Notes</InputLabel>
                <Input
                    type="text"
                    name="notes"
                    id="notes"
                    placeholder="Anything to note..."
                    value={transaction.notes}
                    onChange={handleInputChange}
                />
            </FormControl>
            {/* </Grid>
            <Grid item xs={3}> */}
            <FormControl fullWidth>
                <InputLabel for="amount">Amount</InputLabel>
                <Input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="0"
                    value={transaction.amount}
                    onChange={handleInputChange}
                />
            </FormControl>
            {/* </Grid>
            <Grid item xs={3}> */}
            <FormControl>
                <InputLabel for="date"></InputLabel>
                <Input
                    type="date"
                    name="date"
                    id="date"
                    value={transaction.date}
                    onChange={handleInputChange}
                />
            </FormControl>
            {/* </Grid>
            <Grid item xs={3}> */}
            <FormControl fullWidth>
                <InputLabel for="categoryId">Category</InputLabel>
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
            </FormControl>
            {/* </Grid> */}
            <Button
                className="btn btn-primary"
                disable={isLoading}
                onClick={handleSave}
            >
                {transactionId ? "Save" : "Submit"}
            </Button>
        </Grid>
    )
}

export default TransactionForm
