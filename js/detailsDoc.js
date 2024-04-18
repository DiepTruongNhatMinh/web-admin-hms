// detailsDoc.js

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

   // Reference to the specific doctor node in the database
   const database = firebase.database();
   const doctorRef = database.ref('users');

   // Get the doctor ID from the URL
   const urlParams = new URLSearchParams(window.location.search);
   const doctorId = urlParams.get('id');

   // Get reference to the HTML elements
   const fullNameElement = document.getElementById('fullName');
   const genderElement = document.getElementById('gender');
   const date_of_birthElement = document.getElementById('date_of_birth');
   const specialistElement = document.getElementById('specialist');
   const registrationStatusElement = document.getElementById('registrationStatus');
   const emailElement = document.getElementById('email');
   const passwordElement = document.getElementById('password');
   const certElement = document.getElementById('cert');


   

   // Fetch data for the specific doctor
   doctorRef.child(doctorId).once('value', function (snapshot) {
       const doctorData = snapshot.val();

       // Update the HTML elements with the retrieved data
       fullNameElement.value = doctorData.fullName || '';
       genderElement.value = doctorData.gender || '';
       date_of_birthElement.value = doctorData.date_of_birth || '';
       specialistElement.value = doctorData.specialist || '';
       registrationStatusElement.value = doctorData.registrationStatus || '';
       emailElement.value = doctorData.email || '';
       passwordElement.value = doctorData.password || '';

       console.log('Base64 Data:', doctorData.cert);

       if (doctorData.cert && Array.isArray(doctorData.cert)) {
           doctorData.cert.forEach((base64, index) => {
               if (isValidBase64(base64)) {
                   b64toBlob(base64).then(blob => {
                       const imageUrl = URL.createObjectURL(blob);
   
                       // Create a new image element for each image
                       const imageElement = document.createElement('img');
                       imageElement.src = imageUrl;
                       imageElement.alt = `Image ${index + 1}`;
                       // Set a maximum width for the image
                       imageElement.style.maxWidth = '50%';
                       certContainer.appendChild(imageElement);
   
                       console.log(`Image ${index + 1} Source:`, imageUrl);
                   }).catch(error => {
                       console.error(`Error for Image ${index + 1}:`, error);
                   });
               } else {
                   console.error(`Invalid base64 data for Image ${index + 1}.`);
               }
           });
       } else {
           console.error('Invalid or undefined base64 data.');
       }

});

function isValidBase64(str) {
    try {
        atob(str);
        return true;
    } catch (err) {
        console.error('Invalid base64 string:', str);
        return false;
    }
}

// Function to convert base64 to Blob
function b64toBlob(base64, type = 'image/png') {
    const url = `data:${type};base64,${base64}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            return response.blob();
        })
        .catch(error => {
            console.error('Error converting base64 to Blob:', error);
            console.log('Invalid base64 string:', base64);
            return null; // Return null in case of an error
        });
}



     //Approve Doctor Account
     const approveButton = document.getElementById('approveButton');
     //binding the button
     approveButton.addEventListener('click', function(){
        approveDoctorRegistration(); 
     })
 
     function approveDoctorRegistration() {
         doctorRef.child(doctorId).update({
             registrationStatus: 'approved',
         })
         .then(() => {
             alert('Registration has been approved');
         })
         .catch((error) => {
             alert('Unsuccessful');
             console.log(error);
         });
     }
 
     //Decline the Doctor registration
     const declineButton = document.getElementById('declineButton');
 
     // Decline
     declineButton.addEventListener('click', function () {
         doctorRef.child(doctorId).once('value', function (snapshot) {
             const doctorData = snapshot.val();
             
             if (doctorData.registrationStatus !== 'approved') {
                 declineDoctorRegistration();
             } else {
                 alert('Cannot decline an already approved user.');
             }
         });
     });
     
     function declineDoctorRegistration(){
         doctorRef.child(doctorId).remove()
         .then(() => {
             alert('Registration has been declined and Removed from the Database');
         })
         .catch((error) => {
             alert('Unsuccessful');
             console.log(error);
         });
     }
 });