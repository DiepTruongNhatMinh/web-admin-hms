

const firebaseConfig = {
    apiKey: "AIzaSyBU5WoDuuXb5ZZFApL51Jd4zhj_SW8AzsI",
  authDomain: "hmm-system.firebaseapp.com",
  databaseURL: "https://hmm-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hmm-system",
  storageBucket: "hmm-system.appspot.com",
  messagingSenderId: "330663643018",
  appId: "1:330663643018:web:04be91e381f52c04cd6a73",
};

firebase.initializeApp(firebaseConfig);

// auth.js

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Sign in with Firebase
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log('User signed in:', user);

            // Notify user about successful login
            notifyUser('Login successful!', 'success');

            // Redirect to index.html after successful sign-in
            window.location.href = 'index.html';
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Sign-in error: ${errorCode} - ${errorMessage}`);

            // Notify user about login failure
            notifyUser('Login failed. Please check your username and password.', 'error');
        });
});

// Function to notify the user
function notifyUser(message, type) {
    // You can use a library like SweetAlert for a better notification experience
    // For simplicity, alert is used here
    if (type === 'success') {
        alert(message);
    } else if (type === 'error') {
        alert(message);
    }
}
