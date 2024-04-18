document.addEventListener('DOMContentLoaded', async function () {
    // Firebase configuration
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

    // Reference to the user_schedules node
    const userFeedbackRef = firebase.database().ref("FeedbackOfPatient");

    // Reference to the HTML table body where you want to display UIDs
    const tbody = document.getElementById('tbody');

    try {
        // Retrieve data from user_schedules node
        const snapshot = await userFeedbackRef.once('value');

        // Iterate through each child node (each UID)
        snapshot.forEach(childSnapshot => {
            // Access the UID using childSnapshot.key
            const uid = childSnapshot.key;

            // Create a new table row
            const row = document.createElement('tr');

            // Create a table data cell for the UID
            const uidCell = document.createElement('td');
            uidCell.textContent = uid;

            // Create table data cells for other fields
            const emailDoctorCell = document.createElement('td');
            const emailPatientCell = document.createElement('td');
            const feedbackCell = document.createElement('td');

            // Set the content of emailDoctorCell, emailPatientCell, and feedbackCell
            emailDoctorCell.textContent = childSnapshot.val().doctorEmail;
            emailPatientCell.textContent = childSnapshot.val().patientEmail;
            feedbackCell.textContent = childSnapshot.val().Feedback;

            // Append the cells to the row
            row.appendChild(uidCell);
            row.appendChild(emailDoctorCell);
            row.appendChild(emailPatientCell);
            row.appendChild(feedbackCell);

           // Add a click event listener to the UID cell
    uidCell.addEventListener('click', async function () {
    try {
        // Retrieve data for the clicked UID
        const uidSnapshot = await userFeedbackRef.child(uid).once('value');

        // Access the data using snapshot.val()
        const uidData = uidSnapshot.val();

        // Redirect to checkSchedule.html with UID data as a query parameter
        window.location.href = `ratingDoctor.html?uid=${uid}&data=${encodeURIComponent(JSON.stringify(uidData))}`;
    } catch (error) {
        console.error("Error retrieving data:", error.message);
    }
});

        // Append the row to the table body
        tbody.appendChild(row);
    });
} catch (error) {
    console.error("Error retrieving data:", error.message);
}
});
