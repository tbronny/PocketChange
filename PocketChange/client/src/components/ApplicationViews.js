import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import BudgetList from "./BudgetList"
import BudgetForm from "./BudgetForm"

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <BudgetList /> : <Redirect to="/login" />}
            </Route>

            <Route path="/" exact>
                <BudgetList />
            </Route>

            <Route path="/budgets/add">
                <BudgetForm />
            </Route>

            <Route path="/budgets/:id">
                {/* TODO: Budget Details Component */}
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
