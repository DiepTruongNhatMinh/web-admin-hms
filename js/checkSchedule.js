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
    const userSchedulesRef = database.ref('user_schedules');
    const scheduleDetails = document.getElementById('scheduleDetails');

    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');

    if (uid) {
        userSchedulesRef.child(uid).once('value', async function (snapshot) {
            const scheduleData = snapshot.val();

            if (scheduleData) {
                // Display schedule details
                let detailsHTML = '';
                let groupCount = 0;

                // Use Promise.all to wait for all asynchronous queries to complete
                await Promise.all(Object.entries(scheduleData).map(async ([uid, nestedData], index) => {
                    console.log("Nested Data:", nestedData); // Log the nestedData object

                    // Check if it's the start of a new group
                    if (index % 3 === 0) {
                        if (groupCount > 0) {
                            // Close the previous group
                            detailsHTML += '</div>';
                        }

                        // Start a new group
                        detailsHTML += '<div class="group">';
                        groupCount++;
                    }

                    detailsHTML += `<div class="schedule-item">`;
                    detailsHTML += `<p><strong>Full Date Time:</strong> ${nestedData.fullDateTime}</p>`;
                    detailsHTML += `<p>Email: ${nestedData.email}</p>`;

                    // Display cancellation reason if available
                    if (nestedData.cancellationReason && nestedData.cancellationReason.trim() !== 'User-provided reason') {
                        detailsHTML += `<p>Cancellation Reason: <span class="cancellation-reason">${nestedData.cancellationReason}</span></p>`;
                    } else {
                        detailsHTML += '<p>No cancellation reason provided or User-provided reason</p>';
                    }

                    detailsHTML += `</div>`;

                    // Close the current group after every 3 items
                    if ((index + 1) % 3 === 0) {
                        detailsHTML += '</div>';
                    }
                }));

                // Close the last group if the total items are not divisible by 3
                if (Object.keys(scheduleData).length % 3 !== 0) {
                    detailsHTML += '</div>';
                }

                scheduleDetails.innerHTML = detailsHTML;

                // Add event listener to the cancellation reason
                const cancellationReasonElement = document.querySelectorAll('.cancellation-reason');
                if (cancellationReasonElement) {
                    cancellationReasonElement.forEach((element) => {
                        element.addEventListener('click', function () {
                            alert(`Cancellation Reason: ${nestedData.cancellationReason}`);
                        });
                    });
                }
            } else {
                scheduleDetails.innerHTML = '<p>Schedule not found</p>';
            }
        });
    } else {
        scheduleDetails.innerHTML = '<p>Invalid UID</p>';
    }
});
