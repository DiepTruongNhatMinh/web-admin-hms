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
    const appointmentsRef = database.ref('Appointments');

    const urlParams = new URLSearchParams(window.location.search);
    const patientUid = urlParams.get('uid');

    console.log('Patient UID:', patientUid);

    if (patientUid) {
        // Retrieve appointment data based on patient UID
        appointmentsRef.orderByChild('patientId').equalTo(patientUid).once('value', async function (snapshot) {
            console.log('Appointment Data:', snapshot.val());

            const appointmentDetailsElement = document.getElementById('appointmentDetails');

            if (appointmentDetailsElement) {
                const appointmentData = snapshot.val();

                if (appointmentData !== null) {
                    // Display appointment details
                    let detailsHTML = '<div class="bg-white p-4 rounded shadow-md">';

                    // Access nested properties
                    Object.entries(appointmentData).forEach(([appointmentId, appointment]) => {
                        detailsHTML += `<p><strong>Appointment ID:</strong> ${appointmentId}</p>`;
                        Object.entries(appointment).forEach(([key, value]) => {
                            detailsHTML += `<p><strong>${key}:</strong> ${value}</p>`;
                        });

                        // Add a line break after each group
                        detailsHTML += '<hr>';
                    });

                    detailsHTML += '</div>';

                    // Display appointment details
                    appointmentDetailsElement.innerHTML = detailsHTML;
                } else {
                    appointmentDetailsElement.innerHTML = '<p>No Appointment data found</p>';
                }
            } else {
                console.error('Element with ID "appointmentDetails" not found.');
            }
        });
    } else {
        console.error('Invalid Patient UID:', patientUid);
    }
});
