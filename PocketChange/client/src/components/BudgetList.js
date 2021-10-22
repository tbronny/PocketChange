import React, { useEffect, useState } from "react"
import Budget from "./Budget"
import { getAllBudgets } from "../modules/budgetManager"

const BudgetList = () => {
    const [budgets, setBudgets] = useState([])

    const getBudgets = () => {
        getAllBudgets().then((budgets) => setBudgets(budgets))
    }

    useEffect(() => {
        getBudgets()
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                {budgets.map((budget) => (
                    <Budget budget={budget} key={budget.id} />
                ))}
            </div>
        </div>
    )
}

export default BudgetList
