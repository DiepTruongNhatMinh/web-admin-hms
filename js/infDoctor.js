// infDoctor.js

document.addEventListener('DOMContentLoaded', function () {
    // Firebase configuration (initializeApp is available globally)
    const firebaseConfig = {
        apiKey: "AIzaSyBU5WoDuuXb5ZZFApL51Jd4zhj_SW8AzsI",
        authDomain: "hmm-system.firebaseapp.com",
        databaseURL: "https://hmm-system-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "hmm-system",
        storageBucket: "hmm-system.appspot.com",
        messagingSenderId: "330663643018",
        appId: "1:330663643018:web:04be91e381f52c04cd6a73",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully!");

    // Reference to the specific doctor node in the database
    const database = firebase.database();
    const doctorRef = database.ref('users');
    const tbody = document.getElementById('tbody');
    

    // Listen for changes in the data
    doctorRef.on('value', function (snapshot) {
        // Clear existing rows in tbody
        tbody.innerHTML = '';
        // Loop through the doctors in the snapshot
        snapshot.forEach(function (doctorSnapshot) {
            const doctorData = doctorSnapshot.val();

            // Create a new row in the table
            const row = tbody.insertRow();

            // Create cells for each piece of data
            const fullNameCell = row.insertCell(0);
            const registrationStatusCell = row.insertCell(1);
            const specialistCell = row.insertCell(2);

            // Populate the cells with data
            fullNameCell.innerHTML = '<div class="text-sm font-medium text-gray-900" onclick="redirectToDetails(\'' + doctorSnapshot.key + '\')">' + (doctorData.fullName || '') + '<br>' + (doctorData.email || '') + '</div>';

            // Set condition for registerStatus color
            const status = doctorData.registrationStatus || '';
            if (status.toLowerCase() === 'pending') {
                registrationStatusCell.innerHTML = '<span class=" inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">' + status + '</span>';
            } else if (status.toLowerCase() === 'approved') {
                registrationStatusCell.innerHTML = '<span class="inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">' + status + '</span>';
            } else {
                // Default case, you can add more conditions if needed
                registrationStatusCell.textContent = status;
            }

            specialistCell.innerHTML = '<span class="text-sm text-black-500">' + (doctorData.specialist || '') + '</span>';
        });
    });
});

// Function to redirect to detailsDoctor.html with the doctor ID
function redirectToDetails(doctorId) {
    window.location.href = 'detailsDoctor.html?id=' + doctorId;
}
