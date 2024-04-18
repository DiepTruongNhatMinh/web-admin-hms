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

    // Filter doctors with registrationStatus as "approved"
    const approvedDoctors = [];
    snapshot.forEach(function (doctorSnapshot) {
      const doctorData = doctorSnapshot.val();

      if (doctorData.registrationStatus === 'approved') {
        approvedDoctors.push(doctorData);

        // Create a new row in the table
        const row = tbody.insertRow();

        // Create cells for each piece of data
        const fullNameCell = row.insertCell(0);
        const genderCell = row.insertCell(1)
        const moblie_phoneCell = row.insertCell(2);
        const emailCell = row.insertCell(3);
        const date_of_birthCell = row.insertCell(4);
        const specialistCell = row.insertCell(5);

        // Populate the cells with data and add onclick attribute
        fullNameCell.innerHTML = '<div class="text-sm font-medium text-gray-900" onclick="window.location.href=\'detailsDoctor.html?id=' + doctorSnapshot.key + '\'">' + (doctorData.fullName || '') + '</div>';
        genderCell.innerHTML = '<span class="text-sm text-gray-500">' + (doctorData.gender || '') + '</span>';
        moblie_phoneCell.innerHTML = '<span class="text-sm text-gray-500">' + (doctorData.moblie_phone || '') + '</span>';
        emailCell.innerHTML = '<span class="text-sm text-gray-500">' + (doctorData.email || '') + '</span>';
        date_of_birthCell.innerHTML = '<span class="text-sm text-gray-500">' + (doctorData.date_of_birth || '') + '</span>';
        specialistCell.innerHTML = '<span class="text-sm text-gray-500">' + (doctorData.specialist || '') + '</span>';
      }
    });

    // Now, approvedDoctors array contains only doctors with registrationStatus as "approved"
    console.log("Approved Doctors:", approvedDoctors);
  });
});
