import {initializeApp} from 'firebase/app'
import{
    getFirestore, collection, getDocs,
    addDoc , deleteDoc, doc
}from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword
}from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBNtfAEc6VDxTW_NbReQmCbxCsjl4fgUbg",
    authDomain: "medgest-e25a2.firebaseapp.com",
    projectId: "medgest-e25a2",
    storageBucket: "medgest-e25a2.appspot.com",
    messagingSenderId: "616257271562",
    appId: "1:616257271562:web:f6c19740627c8fe49f2cf3"
  };
initializeApp(firebaseConfig)

const db = getFirestore()

const auth = getAuth()

const colRef = collection(db, 'Patients')

const colRef2 = collection(db,'Doctor')

const colRef3 = collection(db,'Appointments')

getDocs(colRef)
  .then((snapshot) => {
      let Patients = []
       snapshot.docs.forEach((doc) =>{
           Patients.push({ ...doc.data(), id: doc.id })
       })
      console.log(Patients)
  }) 
  .catch(err =>{
      console.log(err.message)
  })


  getDocs(colRef2)
  .then((snapshot) => {
      let Doctor = []
      snapshot.docs.forEach((doc) =>{
          Doctor.push({ ...doc.data(), id:doc.id})
      })
      console.log(Doctor)
  }) 
  .catch(err =>{
      console.log(err.message)
  })

  getDocs(colRef3)
  .then((snapshot) => {
    let Appointments = []
      snapshot.docs.forEach((doc) =>{
          Appointments.push({ ...doc.data(), id:doc.id})
      })
      console.log(Appointments)
  }) 
  .catch(err =>{
      console.log(err.message)
  })

  //adding documents
  const addPatientForm = document.querySelector('.add')
  addPatientForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    addDoc(colRef, {
        Nom_Prenom: addPatientForm.Nom_Prenom.value, 
        Numero: addPatientForm.Numero.value,
        Age: addPatientForm.Age.value,
        Rendez_vous: addPatientForm.Rendez_vous.value,  
        Medecin: addPatientForm.Medecin.value,

    })
    .then(() => {
        addPatientForm.reset()
    })

  })

  //deleting documents
//   const deletePatientForm = document.querySelector('.delete')
//   deletePatientForm.addEventListener('submit', (e) =>{
//       e.preventDefault()

//       const docRef = doc(db, 'Patients', deletePatientForm.id.value)


//       deleteDoc(docRef)
//         .then(() => {
//             deletePatientForm.reset()
//         })
//   })

  // signing users up
 // signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value
    console.log(email)
    console.log(password)
  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})
