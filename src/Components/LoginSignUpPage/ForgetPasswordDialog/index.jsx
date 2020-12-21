import React from "react"
import {Dialog, DialogContent, DialogTitle, DialogActions, Button, DialogContentText ,TextField} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useSnackbar} from "notistack"
import axios from "axios"
const useStyles=  makeStyles((theme)=>({
  dialog:{
    padding:theme.spacing(3)
  },
  inputRed:{
    borderColor:"red",
    borderWidth:2
  },
  inputGreen:{
    borderColor:"green",
    borderWidth:2
  }
}))





export default function ForgetPasswordDialog ({emailID,open,setOpen}) {
    const classes=useStyles()
  
    const {enqueueSnackbar} = useSnackbar()
    const [emailId,setEmailId] = React.useState(emailID)
    const [emailCheck,setEmailCheck] = React.useState(null)
    const sendForgetRequest = () =>{
      if(emailCheck===null){
        enqueueSnackbar("Please enter an email ID",{variant:"error"})
        return 
      }
      if(!emailCheck){
        enqueueSnackbar("Please enter a valid email ID", {variant:"error"})
        return 
      }

      axios.post('http://localhost:9000/forgetRequest',{emailId:emailId},{withCredentials:true})
      .then((response)=>{
        if(response.data.status){
          enqueueSnackbar("An Email has been sent to your email ID.Please click that link to reset password",{variant:"success"})
        }
        else{
          enqueueSnackbar("Email Couldn't be delivered. Please Try again",{variant:"error"})
        }
      })
      .catch((err)=>{
        enqueueSnackbar("Error encountered while requesting. Try Again",{variant:"error"})
      })

      
        console.log("sending forget request for " + emailId)
    }

    const checkEmailVali  = () =>{
      var ePatt = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
      setEmailCheck(ePatt.test(emailId))
    }

    
    return (
      <div>
        <Dialog open={open} className={classes.dialog}>
          <DialogTitle>Forget Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your valid Email ID
            </DialogContentText>
            
              <TextField
                label="Email ID"
                placeholder="Email ID"
                required
                type="email"
                variant="outlined"
                value={emailId}
                onBlur={()=>{
                  checkEmailVali()
                }}
                classes={{root:emailCheck===null?null:emailCheck?classes.inputGreen:classes.inputRed}}
                helperText="Please input your login Email ID"
                onChange={(e)=>{
                    const {value} =  e.target
                    setEmailId(value)
                }}
              />
              
        
          </DialogContent>
          <DialogActions>
              <Button 
              color="primary"
              
              onClick={()=>{
                  setOpen(false)
              }}
              >
                Cancel
              </Button>
              <Button
              color="primary"
              
              onClick={()=>{
                  sendForgetRequest()
              }}
              >
                Confirm
              </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}