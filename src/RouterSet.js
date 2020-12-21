import React from "react"
import {
    BrowserRouter as Router,
    Route ,
    Switch
} from "react-router-dom"
import LoginSignUpPage from "./Components/LoginSignUpPage"
import ResetPassword from "./Components/LoginSignUpPage/ForgetPasswordDialog/ResetPassword"

export default function RouterSet (){
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/login" >
                        <LoginSignUpPage type="login" />
                    </Route>
                    <Route exact path="/signup" >
                        <LoginSignUpPage type="signup" />
                    </Route>
                    <Route exact path="/" >
                        <LoginSignUpPage type="login" />
                    </Route>
                    <Route exact path="/resetpassword/:uuid" >
                        <ResetPassword />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}