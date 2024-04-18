
// Function to view patient details
function viewPatientDetails(patientUID) {
    // Redirect to the detailsPatient page with the patient's UID
    window.location.href = 'detailsPatient.html?uid=' + patientUID;
}


document.addEventListener('DOMContentLoaded', function () {
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

    const database = firebase.database();
    const patientRef = database.ref('patient');

   
    // Retrieve data from the "patient" node
    patientRef.on('value', function(snapshot) {
        // Clear existing rows in the table body
        document.getElementById('tbody').innerHTML = '';

        // Loop through each child of the "patient" node
        snapshot.forEach(function(childSnapshot) {
            // Get the data of each patient
            var patientData = childSnapshot.val();
            var patientUID = childSnapshot.key; // Get the UID of the patient

            // Create a new row in the table
            var newRow = document.createElement('tr');

            // Add Full Name and Email as columns in the row
            newRow.innerHTML = `
            <td class="py-3 text-left text-xs font-medium text-gray-800 cursor-pointer" onclick="viewPatientDetails('${encodeURIComponent(patientUID)}')">${patientData.fullName}</td>
            <td class="py-3 text-left text-xs font-medium text-gray-800">${patientData.doB}</td>
            <td class="py-3 text-left text-xs font-medium text-gray-800">${patientData.gender}</td>
            <td class="py-3 text-left text-xs font-medium text-gray-800">${patientData.mobile}</td>
            <td class="py-3 text-left text-xs font-medium text-gray-800">${patientData.email}</td>
            `;

            // Append the new row to the table body
            document.getElementById('tbody').appendChild(newRow);
        });

        
    });

     
});
