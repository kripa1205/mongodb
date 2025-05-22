import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { clearauth,initiallogin } from './redux/slice/authslice'
import axios from'axios'
import { useSelector } from "react-redux";

function App(){
  const initialvalue ={
  email :'kripa@gmail.com',
  password:'1234'
  }
  const auth = authSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const [formdata,setformdata]=useState(initialvalue)
  const handledata = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };
}
const handlesumbit = async() => {
  try{
    const res = await axios.post ('http://localhost:5000/api/login', formdata)
    if (res.data.status){
      localStorage.setItem("token",res.data.data.token)
      dispatch(initiallogin(res.data.data.data))
    }
  }
  catch(error){
    console.log(error)
  }
} 
const logout=()=>{
  localStorage.removeItem('token')
  dispatch(clearauth)
}
return(
  <>
  {auth.auth ? (
  <>
  <h2>{auth.user.name}</h2>
  <h3>{auth.user.email}</h3>
  <button className='btn btn-primary' onClick={logout}>Logout</button>
  </>
):(
  <>
  <input type="text"  name='email' className='form-control' placeholder='enter the email' onClick={handledata} value={formdata.email}/>
  <input type="password" name="password" className='form-control my-4' placeholder='enter the passwprd' onChange={handledata} value={formdata.password}  />]
  <button onClick={handlesumbit} className='btn btn-primary'>Login</button>
  
  </>
)}
</>
)

 



export default App
