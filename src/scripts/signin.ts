import axios from 'axios';

const login = async()=>{
	const data = await axios.post("http://localhost:3000/api/user/signin",{
		username:"admin",
		password:"admin"
});
	console.log("token",data.data.token);
}

login();	
