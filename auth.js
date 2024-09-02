
const handleRegistration=(event)=>{
    event.preventDefault();
    const username = getValue('username');
    const first_name = getValue('first_name');
    const last_name = getValue('last_name');
    const email = getValue('email');
    const password = getValue('password');
    const confirm_password = getValue('confirm_password');

    const info = ({username,first_name,last_name,email,password,confirm_password});

    if (password == confirm_password){
        document.getElementById('error').innerText = '';
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            password
          )){
            console.log(info);
            fetch('https://creat-stream.onrender.com/patient/register/',{
                method : 'POST',
                headers : {'content-type' : 'application/json'},
                body : JSON.stringify(info)
            })
            .then(res=> res.json())
            .then(data => console.log(data))
          }
          else{
            document.getElementById('error').innerText = 'Password must contain eight characters, at least one letter, one number and one special character:'
          }
    }
    else{
        document.getElementById('error').innerText='Password and Confirm Password did not match'
    }


};

const getValue=(id)=>{
    const value = document.getElementById(id).value;
    return value;
}

const handleLogin=(event)=>{
    event.preventDefault();
    const username = getValue('login-username');
    const password = getValue('login-password');
    console.log(username,password);
    
    if((username && password)){
        fetch('https://creat-stream.onrender.com/patient/login/',{
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);

            if(data.token && data.user_id){
                localStorage.setItem('token',data.token);
                localStorage.setItem('user_id', data.user_id);
                window.location.href = 'index.html'
            }
        });

    }
}

const handlelogOut = () => {
    const token = localStorage.getItem("token");
  
    fetch("https://testing-8az5.onrender.com/patient/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
      });
  };


      // JavaScript code to trigger SweetAlert
      document.getElementById('showAlert').addEventListener('click', function() {
        // Basic SweetAlert example
        Swal.fire({
          title: 'Hello!',
          text: 'This is a SweetAlert dialog.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });

// for profile show 

// Function to check if the user is authenticated
const isAuthenticated = () => {
  // Check if the user token exists in local storage or session storage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return !!token; // Return true if token exists, false otherwise
};

// Function to fetch user profile
const fetchUserProfile = () => {
  // Make a GET request to the profile endpoint with the token
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  fetch('profileEndpoint', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the request header
    },
  })
  .then(response => response.json())
  .then(data => {
    // Display user profile data on the page
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching user profile:', error);
  });
};

// Function to render navbar based on authentication status
const renderNavbar = () => {
  const navbar = document.getElementById('navbar');
  if (isAuthenticated()) {
    // If user is authenticated, fetch and display user profile
    fetchUserProfile();
  } else {
    // If user is not authenticated, display register link in the navbar
    navbar.innerHTML = '<a href="/register">Register</a>';
  }
};

// Call renderNavbar function when the page loads
window.addEventListener('load', renderNavbar);
