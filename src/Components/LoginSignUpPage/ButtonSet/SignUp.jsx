import React from "react"
import {Button} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles"
import {useSnackbar} from "notistack"
import axios from "axios"


const useStyles=  makeStyles((theme)=>({
    root:{
        margin:theme.spacing(2)
    }
}))


export default function SignUp({credentials,credentialsCheck}) {
    const {enqueueSnackbar} = useSnackbar()
    const history= useHistory()
    const classes=useStyles()
    const trySignUp = () =>{
        console.log("trying sign up")
        if(credentialsCheck.username===null){
            enqueueSnackbar("Please enter an email-Id to login",{variant:"error"})
            return 
        }
        if(credentialsCheck.password===null){
            enqueueSnackbar("Please enter a password",{variant:"error"})
            return
        }
        if(!credentialsCheck.username){
            enqueueSnackbar("Please enter a valid email ID",{variant:"error"})
            return 
        }
        if(!credentialsCheck.password){
            enqueueSnackbar("Please enter a password atleast 6 character long",{variant:"error"})
            return 
        }

        axios.post('http://localhost:9000/signup',credentials,{withCredentials:true})
        .then((response)=>{
            console.log(response.data)

            if(response.data.status){
                enqueueSnackbar("Successfully Signed up. Redirecting  to login page", {variant:"success"})
                history.push("/login")
            }
            else{
                enqueueSnackbar("Error in signing up. Please try again",{variant:"error"})
            }
            

        })
        .catch((err)=>{
            enqueueSnackbar("Error in signing up. Please try again",{variant:"error"})
            console.log("Error in signup")
        })

        console.log(credentials)
    }

    


    return (
        <div>
            <Button 
            color="primary"
            variant="outlined"
            classes={{root:classes.root}}
            onClick={()=>{
                trySignUp()
            }}

            >
                 Sign Up
            </Button>
           
            <Button 
            color="secondary"
            variant="outlined"
            classes={{root:classes.root}}
            onClick={()=>{
                history.push('/login')
            }}

            >
                Back To Login
            </Button>
        </div>
    )
}