import React from "react"
import {TextField,IconButton,Typography,Paper} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LoginButton from "./ButtonSet/Login"
import SignUpButton from "./ButtonSet/SignUp"
import axios from "axios";


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
    borderRed:{
      width:"100%",
      borderColor:"red",
      borderWidth:2
    },
    borderGreen:{
      width:"100%",
      borderColor:"green",
      borderWidth:2
    }

}))

export default function LoginSignupPage ({type}) {
    const history= useHistory()
    const classes=useStyles()
    const [credentials,setCredentials] = React.useState({
        username:"",
        password:""
    })
    const [credentialsCheck,setCredentialsCheck] = React.useState({
      username:null,
      password:null
    })
    const [hidePass,setHidePass] = React.useState(true)


    const checkEmailVali  = () =>{
      console.log("checking Email")
    
      var ePatt = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
      console.log(ePatt.test(credentials.username))
      setCredentialsCheck((prev)=>{
        return {
          ...prev,
          username:ePatt.test(credentials.username)
        }

      })
    }

    React.useEffect(()=>{
      axios.post('http://localhost:9000/checkConnection',{data:"This is it"})
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])

    const checkPassVali  = () =>{
      console.log("checking Password")
      console.log(credentials.password.length > 5)
      const checkValue = credentials.password.length > 5
      setCredentialsCheck((prev)=>{
        return {
          ...prev,
          password: checkValue
        }
        
      })
    }


    return (
      <div>
        <Paper elevation={6} classes={{root:classes.paper}}>
        <Typography
        variant = "h5"
        classes={{root:classes.text}}
        >
            {type==="login"?"Please Sign In":"Please Sign Up"}
        </Typography>
          <TextField
            label="Email ID"
            placeholder="Email ID"
            required
            type="email"
            classes={{root:credentialsCheck.username===null?classes.input:credentialsCheck.username?classes.borderGreen:classes.borderRed}}
            variant="outlined"
            
            value={credentials.username}
            helperText={
              type === "login"
                ? "Please input your login Email ID"
                : "Please input a valid Email ID"
            }
            onBlur={()=>{
              checkEmailVali()
            }}

            onChange={(e) => {
              const { value } = e.target;
              setCredentials((prev) => {
                return {
                  ...prev,
                  username: value,
                };
              });
            
            }}
          />

          <TextField
            label="Password"
            placeholder="Password"
            required
            variant="outlined"
            classes={{root:credentialsCheck.password===null?classes.input:credentialsCheck.password?classes.borderGreen:classes.borderRed}}
            onBlur={()=>{
              checkPassVali()
            }}
            classes={{root:classes.input}}
            type={hidePass?"password":"text"}
            value={credentials.password}
            helperText={
              type === "login"
                ? "Please input your password"
                : "Please input a password at least 6 characters long"
            }
            InputProps={{
                endAdornment:<div>
                    <React.Fragment>
                        <IconButton 
                        onClick={()=>{
                            setHidePass((prev)=>{
                                return !prev
                            })
                        }}
                        >
                        {hidePass?<VisibilityIcon />:<VisibilityOffIcon />}
                        </IconButton>
                    </React.Fragment>
                </div>
            }}
            onChange={(e) => {
              const { value } = e.target;
              setCredentials((prev) => {
                return {
                  ...prev,
                  password: value,
                };
              });
            }}
          />

          {type==="login"?<LoginButton credentials={credentials} credentialsCheck={credentialsCheck} />:<SignUpButton credentials={credentials} credentialsCheck={credentialsCheck} />}
          
        </Paper>
      </div>
    );
}