import axios from 'axios';
import register from '../../Pages/Register/register';


const registerURL = 'https://backendblogger.herokuapp.com/api/accounts/register'

axios.post(registerURL,{
    username:'player1',
    email : 'player1@mail.com',
    password1:'password@123',
    password2:'password@123',
}).then(
    res => {
        // console.log(res.data);
    }
)