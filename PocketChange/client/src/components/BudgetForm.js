import React, { useState } from "react"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import { addBudget, getAllBudgets } from "../modules/budgetManager"

const BudgetForm = ({ getBudgets }) => {
    const emptyBudget = {
        label: "",
        total: 0,
        userId: 1,
    }

    const [budget, setBudget] = useState(emptyBudget)

    const handleInputChange = (evt) => {
        const value = evt.target.value
        const key = evt.target.id

        const budgetCopy = { ...budget }

        budgetCopy[key] = value
        setBudget(budgetCopy)
    }

    const handleSave = (evt) => {
        evt.preventDefault()

        addBudget(budget).then(() => {
            setBudget(emptyBudget)
            getAllBudgets()
        })
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
            <Button className="btn btn-primary" onClick={handleSave}>
                Submit
            </Button>
        </Form>
    )
}

export default BudgetForm
