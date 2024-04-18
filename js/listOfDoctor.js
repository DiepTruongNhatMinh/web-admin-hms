// Initialize Firebase with your configuration
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
  
  // Reference to the "Doctor" node in the database
  const database = firebase.database();
  const doctorRef = database.ref('users');
  
  // Function to fetch doctors and populate the table
  const fetchDoctors = () => {
    doctorRef.once('value')
      .then(snapshot => {
        console.log('Snapshot:', snapshot.val()); // Log the entire snapshot
        const tbody = document.getElementById('tbody');
  
        // Clear existing rows
        tbody.innerHTML = '';
  
        snapshot.forEach(doctorSnapshot => {
          // Access the details of each doctor
          const doctorData = doctorSnapshot.val();
  
          console.log('Doctor Data:', doctorData); // Log the doctorData
  
          // Only display doctors with statusRegister set to "approved"
          if (doctorData.registerStatus === 'approved') {
            // Create a new row
            const row = document.createElement('tr');
  
            // Create and append cells for each column
            const emailCell = document.createElement('td');
            emailCell.textContent = doctorData.email;
            row.appendChild(emailCell);
  
            const fullNameCell = document.createElement('td');
            fullNameCell.textContent = doctorData.fullname; // Use 'fullname' instead of 'fullName'
            row.appendChild(fullNameCell);
  
  
            // Append the row to the tbody
            tbody.appendChild(row);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };
  
  // Call the fetchDoctors function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    fetchDoctors();
  });
  