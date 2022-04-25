import Axios from "../../axios";

export const getEndpointTeste = () => {
	return Axios.get("https://gorest.co.in/public/v2/users");
};

//post
//put
//delete