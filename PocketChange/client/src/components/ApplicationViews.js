import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import BudgetList from "./budgets/BudgetList"
import BudgetForm from "./budgets/BudgetForm"

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
