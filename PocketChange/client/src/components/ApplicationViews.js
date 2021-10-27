import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import BudgetList from "./budgets/BudgetList"
import BudgetForm from "./budgets/BudgetForm"
import TransactionForm from "./transactions/TransactionForm"
import TransactionList from "./transactions/TransactionList"
import { CategoryList } from "./categories/CategoryList"
import CategoryForm from "./categories/CategoryForm"

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <BudgetList /> : <Redirect to="/login" />}
            </Route>

            <Route path="/" exact>
                <BudgetList />
            </Route>

            <Route path="/budget/add" exact>
                <BudgetForm />
            </Route>

            <Route path="/budget/edit/:id">
                <BudgetForm />
            </Route>

            <Route path="/transaction/GetByBudget/:budgetId" exact>
                <TransactionList />
            </Route>

            <Route path="/transaction/add" exact>
                <TransactionForm />
            </Route>

            <Route path="/transaction/edit/:id">
                <TransactionForm />
            </Route>

            <Route path="/category" exact>
                <CategoryList />
            </Route>

            <Route path="/category/add" exact>
                <CategoryForm />
            </Route>

            <Route path="/category/edit/:id" exact>
                <CategoryForm />
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    )
}

export default ApplicationViews
