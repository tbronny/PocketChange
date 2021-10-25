import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import {
    addBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
} from "../../modules/budgetManager"

const BudgetForm = () => {
    const [budget, setBudget] = useState({})
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()

    const budgetId = params.id

    useEffect(() => {
        if (budgetId) {
            getBudgetById(budgetId).then((b) => {
                setBudget(b)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    const handleInputChange = (evt) => {
        const value = evt.target.value
        const key = evt.target.id

        const budgetCopy = { ...budget }

        budgetCopy[key] = value
        setBudget(budgetCopy)
    }

    const handleSave = (evt) => {
        evt.preventDefault()
        if (budgetId) {
            setIsLoading(true)
            updateBudget({
                id: parseInt(budgetId),
                label: budget.label,
                total: budget.total,
                userId: budget.userId,
            }).then(() => history.push("/"))
        } else {
            addBudget(budget).then(() => history.push("/"))
        }
    }

    return (
        <Form>
            <FormGroup>
                <Label for="label">Name</Label>
                <Input
                    type="text"
                    name="label"
                    id="label"
                    placeholder="What is this budget called..."
                    value={budget.label}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="total">Starting Amout</Label>
                <Input
                    type="number"
                    name="total"
                    id="total"
                    placeholder="How much money are you starting with..."
                    value={budget.total}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <Button
                className="btn btn-primary"
                disable={isLoading}
                onClick={handleSave}
            >
                {budgetId ? "Save" : "Submit"}
            </Button>
        </Form>
    )
}

export default BudgetForm
