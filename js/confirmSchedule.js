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
    const userSchedulesRef = firebase.database().ref("user_schedules");

    // Reference to the HTML table body where you want to display UIDs
    const tbody = document.getElementById('tbody');

    try {
        // Retrieve data from user_schedules node
        const snapshot = await userSchedulesRef.once('value');

        // Iterate through each child node (each UID)
        snapshot.forEach(childSnapshot => {
            // Access the UID using childSnapshot.key
            const uid = childSnapshot.key;

            // Create a new table row
            const row = document.createElement('tr');

            // Create a table data cell for the UID
            const uidCell = document.createElement('td');
            uidCell.textContent = uid;

            // Create a table data cell for the "Status"
            const statusCell = document.createElement('td');


            // Create a span element with custom styling for the "Confirm" status
            const confirmSpan = document.createElement('span');
            confirmSpan.textContent = 'Confirm';
            confirmSpan.classList.add('inline-flex', 'text-xs', 'leading-5', 'font-semibold', 'rounded-full', 'bg-green-100', 'text-green-800');

            // Append the span element to the status cell
            statusCell.appendChild(confirmSpan);

            // Append the cells to the row
            row.appendChild(uidCell);
            row.appendChild(statusCell);

           // Add a click event listener to the UID cell
    uidCell.addEventListener('click', async function () {
    try {
        // Retrieve data for the clicked UID
        const uidSnapshot = await userSchedulesRef.child(uid).once('value');

        // Access the data using snapshot.val()
        const uidData = uidSnapshot.val();

        // Redirect to checkSchedule.html with UID data as a query parameter
        window.location.href = `checkSchedule.html?uid=${uid}&data=${encodeURIComponent(JSON.stringify(uidData))}`;
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
