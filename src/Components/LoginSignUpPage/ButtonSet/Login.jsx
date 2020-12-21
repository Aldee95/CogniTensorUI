import React from "react" 
import {Button} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import ForgetPasswordDialog from "../ForgetPasswordDialog"
import axios from "axios"
import {useSnackbar} from "notistack"
const useStyles=  makeStyles((theme)=>({
    root:{
        margin:theme.spacing(2)
    }
}))




export default function Login({credentials,credentialsCheck}){
    const {enqueueSnackbar} = useSnackbar()
    const classes=useStyles()
    const [forgetDialogOpen,setForgetDialogOpen] =  React.useState(false)

    const tryLogin = () =>{
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

        axios.post('http://localhost:9000/login',credentials,{withCredentials:true})
        .then((response)=>{
            
            if(response.data.status){
                enqueueSnackbar("Successfully Logged in with Mongo ID"+response.data.payload._id.toString(), {variant:"success"})
            }
            else{
                if(response.data.payload==='username'){
                    enqueueSnackbar("Wrong Username.Please try again",{variant:"error"})
                }
                else if(response.data.payload==='password'){
                    enqueueSnackbar("Wrong Password.Please try again",{variant:"error"})
                }
            }
        })
        .catch((err)=>{
            
            enqueueSnackbar("Error logging in. Please try again",{variant:"error"})
            console.log("Error in signup")
        })

    }


    const tryForgetPassword = () =>{
        setForgetDialogOpen(true)
        console.log("trying forget password")
    }


    return (
        <div>
            <Button 
            variant="outlined"
            color="primary"
            classes={{root:classes.root}}
            onClick={()=>{
                tryLogin()
            }}
            >
                Login
            </Button>
            {forgetDialogOpen&&<ForgetPasswordDialog open={forgetDialogOpen} setOpen={setForgetDialogOpen} emailID={credentials.username} />}
            <Button 
            variant="outlined"
            classes={{root:classes.root}}
            color="secondary"
            label="Forget Password"
            onClick={()=>{
                tryForgetPassword()
            }}
            >
                Forget Password
            </Button>
        </div>
    )
}