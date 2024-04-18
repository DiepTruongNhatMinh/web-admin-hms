// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase
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


 // Function to fetch the count of approved doctors and update the HTML
 const countApprovedDoctors = () => {
  doctorRef.orderByChild('registrationStatus').equalTo('approved').once('value')
    .then(snapshot => {
      const approvedDoctorCount = snapshot.numChildren();
      console.log('Approved Doctor count:', approvedDoctorCount);

      // Update the approvedDoctorCount on the HTML element if it exists
      const approvedDoctorCountElement = document.getElementById('approvedDoctorCount');
      if (approvedDoctorCountElement) {
        approvedDoctorCountElement.innerText = approvedDoctorCount;

        // After fetching data, render the charts
        renderCharts();
      } else {
        console.error('Element with id "approvedDoctorCount" not found in the DOM.');
      }
    })
    .catch(error => {
      console.error('Error fetching approved doctor count:', error);
    });
};

// Function to fetch the count of patients and update the HTML
const countPatients = () => {
  const patientRef = database.ref('patient'); // Assuming 'patient' is the correct node
  patientRef.once('value')
    .then(snapshot => {
      const patientCount = snapshot.numChildren();
      console.log('Patient count:', patientCount);

      // Update the patientCount on the HTML element
      const patientCountElement = document.getElementById('countPatients');
      patientCountElement.innerText = patientCount;

      // After fetching data, render the charts
      renderCharts();
    })
    .catch(error => {
      console.error('Error fetching patient count:', error);
    });
};
// Function to fetch the count of approved doctors and update the HTML
const countPendingDoctors = () => {
  doctorRef.orderByChild('registrationStatus').equalTo('pending').once('value')
    .then(snapshot => {
      const pendingDoctorCount = snapshot.numChildren();
      console.log('Pending Doctor count:', pendingDoctorCount);

      // Update the pendingDoctorCount on the HTML element if it exists
      const pendingDoctorCountElement = document.getElementById('pendingDoctorCount');
      if (pendingDoctorCountElement) {
        pendingDoctorCountElement.innerText = pendingDoctorCount;

        // After fetching data, render the charts
        renderCharts();
      } else {
        console.error('Element with id "approvedDoctorCount" not found in the DOM.');
      }
    })
    .catch(error => {
      console.error('Error fetching pending doctor count:', error);
    });
};


// Function to fetch the count of booked user_schedules and update the HTML
const countBookedSchedules = () => {
  console.log('Fetching booked schedules count...');
  const userSchedulesRef = database.ref('Appointments');
  userSchedulesRef.once('value')
    .then(snapshot => {
      const scheduleCount = snapshot.numChildren();
      // Update the scheduleCount on the HTML element
      const scheduleCountElement = document.getElementById('countSchedule');
      if (scheduleCountElement) {
        scheduleCountElement.innerText = scheduleCount;

        // After fetching data, render the charts
        renderCharts();
      } else {
        console.error('Element with id "countSchedule" not found in the DOM.');
      }
    })
    .catch(error => {
      console.error('Error fetching booked schedules count:', error);
    });
};



  // Function to render the charts
  const renderCharts = () => {
    // Bar Chart
    var barChartOptions = {
      chart: {
        type: 'bar',
      },
      series: [{
        name: 'Doctors',
        data: [/* Your bar chart data array goes here */],
      }],
    };

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();

    // Area Chart
    var areaChartOptions = {
      chart: {
        type: 'area',
      },
      series: [{
        name: 'Appointments',
        data: [/* Your area chart data array goes here */],
      }],
    };

    var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
    areaChart.render();
  };

  // Sidebar toggle 
  var sidebarOpen = false;
  var sidebar = document.getElementById("sidebar");

  function openSidebar() {
    if (!sidebarOpen) {
      sidebar.classList.add("sidebar-responsive");
      sidebarOpen = true;
    }
  }

  function closeSidebar() {
    if (!sidebarOpen) {
      sidebar.classList.remove("sidebar-responsive");
      sidebarOpen = false;
    }
  }

  // Call the function to count and display approved doctors
countApprovedDoctors();
countPatients();
countPendingDoctors();
countBookedSchedules();
});
