// 1. Replace with your actual config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWpZz98m8y54sfFkW01IHpgngJjWa1Rag",
  authDomain: "puthal-9451b.firebaseapp.com",
  projectId: "puthal-9451b",
  storageBucket: "puthal-9451b.firebasestorage.app",
  messagingSenderId: "739809753187",
  appId: "1:739809753187:web:5a8a6f0d18999f41e22056",
  measurementId: "G-HL204H6M0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// =================== Signup ===================
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const msg = document.getElementById('signupMsg');

    if (!name || !email || !password || !confirmPassword) {
      msg.textContent = "Please fill all fields.";
      return;
    }

    if (!email.includes('@')) {
      msg.textContent = "Invalid email format.";
      return;
    }

    if (password.length < 6) {
      msg.textContent = "Password too short.";
      return;
    }

    if (password !== confirmPassword) {
      msg.textContent = "Passwords do not match.";
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        msg.textContent = "Signup successful!";
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        msg.textContent = error.message;
      });
  });
}

// =================== Login ===================
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;
    const msg = document.getElementById('loginMsg');

    if (!email || !password) {
      msg.textContent = "Please fill all fields.";
      return;
    }

    const persistence = remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;

    auth.setPersistence(persistence).then(() => {
      return auth.signInWithEmailAndPassword(email, password);
    }).then(() => {
      msg.textContent = "Login successful!";
      window.location.href = "dashboard.html";
    }).catch(error => {
      msg.textContent = "Invalid Credentials";
    });
  });
}

// =================== Dashboard Auth Check ===================
if (window.location.pathname.includes("dashboard.html")) {
  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('welcomeMsg').textContent = `Welcome back, ${user.email}`;
    } else {
      window.location.href = "index.html";
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', function () {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  });
}
