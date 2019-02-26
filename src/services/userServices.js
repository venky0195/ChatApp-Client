import axios from 'axios';

export function userRegister(data) {
    return axios.post('/register', data);
}

export function userLogin(data) {
    return axios.post('/login', data);
}

export function resetPassword(Password,token) {
    return axios.post(`/resetpassword/${token}`,{ 'Password': Password },{ headers: { 'token': token } })}

export function forgotPassword(userName) {
  //  console.log("result====",userName);
    
   return axios.post('/forgotPassword', {'Email': userName})

        .then(function (response) {
            console.log("reeeess-=====",response);
            alert('Please check your mailbox for the link to reset your password.')
        })
        .catch(function (err) {
            console.log("errrrrrr=========",err);
            alert('User Not Found.');
        });
}