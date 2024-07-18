
import axios from 'axios'
const Testing = ({}) => {
  const data = {
    email: "ssad@gmail.com",
    password: "Testing193!"
  };

  axios.post('https://projectone-h83j.onrender.com/auth/login', data, {
})
.then(response => {
    console.log(response.data);
    // Handle the response from the API as needed
})
.catch(error => {
    console.error('There was a problem with your Axios request:', error);
});

  return (
    <div className="testing">

    </div>
  )
}

export default Testing