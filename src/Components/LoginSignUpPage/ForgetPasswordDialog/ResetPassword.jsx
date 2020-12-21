import React from "react"
import {TextField, Button,Paper,Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useParams,useHistory} from "react-router-dom"
import {useSnackbar} from "notistack"
import axios from "axios"


const useStyles=makeStyles((theme)=>({
    paper:{
        width: "20%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        padding: "30px"
        },
        text:{
            width: "fit-content",
            margin: "8px auto 16px auto"
        
          },
          input:{
            width:"100%"
          },   
          button:{
              margin:"16px",
              position:"relative",
              left:"65px"
          }
}))


export default function ResetPassword() {
    const history= useHistory()
    const {enqueueSnackbar} = useSnackbar()
    const classes=useStyles()
    const [active,setActive] = React.useState(false)
    const [password,setPassword] = React.useState("")
    const [passwordCheck,setPasswordCheck] = React.useState(false)
    const {uuid}=useParams()

    const checkPassVali  = () =>{
        console.log("checking Password")
        console.log(password.length > 5)
        const checkValue = password.length > 5
        setPasswordCheck(checkValue)
      }

    const sendRequest =() =>{
        if(!passwordCheck){
            enqueueSnackbar("Please enter password atleast 6 character long",{variant:"error"})
            return
        }
        axios.post('http://localhost:9000/resetPassword',{uuid,password})
        .then((response)=>{
            if(response.data.status){
                enqueueSnackbar("Your password has been successfully changed. Redirecting to login",{variant:"success"})
                history.push('/login')
            }
            else{
                if(response.data.payload==='notfound'){
                    enqueueSnackbar("Username not found",{variant:"error"})
                }
                enqueueSnackbar("Your password couldn't be updated. Try again.",{variant:"error"})
            }
        })
        .catch((err)=>{
            enqueueSnackbar("Your password couldn't be updated. Try again.",{variant:"error"})
        })

    }
    
    React.useEffect(()=>{
        axios.post("http://localhost:9000/checkuuid",{uuid})
        .then((response)=>{
            if(response.data.status){
                enqueueSnackbar("UUID verified",{variant:"success"})
                setActive(true)
            }
            else{
                enqueueSnackbar("UUID not verified",{variant:"error"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <Paper elevation={6} classes={{root:classes.paper}}>
        <Typography
        variant = "h5"
        classes={{root:classes.text}}
        >
            Reset Password
        </Typography>
            <TextField
            label="New password"
            placeholder="New Password"
            disabled={!active}
            classes={{root:classes.input}}
            variant="outlined"
            value={password}
            onChange={(e)=>{
                const {value} = e.target
                setPassword(value)
                checkPassVali()
            }}
            />
        <Button 
        variant="outlined"
        color="primary"
        classes={{root:classes.button}}
        disabled={!active}
        onClick={()=>{
            
            sendRequest()
        }}>
            Reset Password
        </Button>

        </Paper>
    )
}