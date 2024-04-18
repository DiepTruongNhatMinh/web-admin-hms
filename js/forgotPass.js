// firebase-config.js
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

// forgotPass.js
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;

    // Send password reset email
    firebase.auth().sendPasswordResetEmail(username)
        .then(() => {
            // Password reset email sent successfully
            console.log('Password reset email sent successfully.');

            // Notify user about the password reset email
            notifyUser('Password reset email sent successfully. Check your inbox.', 'success');

            // Redirect to login page or any other page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Password reset error: ${errorCode} - ${errorMessage}`);

            // Notify user about the password reset failure
            notifyUser('Password reset failed. Please check your username and try again.', 'error');
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
