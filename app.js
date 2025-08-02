// Firebase Config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCggeh5flofwkl79AYQbVXN-obbT16swLw",
  authDomain: "puthal-login1.firebaseapp.com",
  projectId: "puthal-login1",
  storageBucket: "puthal-login1.appspot.com",
  messagingSenderId: "54527810515",
  appId: "1:54527810515:web:9bd9b7ce7423a1c75bad26"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Signup
if (document.getElementById("signupForm")) {
  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const msg = document.getElementById("signupMsg");

    if (password !== confirmPassword) {
      msg.textContent = "Passwords do not match.";
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem("userName", name);
        msg.textContent = "Signup successful!";
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        msg.textContent = err.message;
      });
  });
}

// Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const remember = document.getElementById("rememberMe").checked;
    const msg = document.getElementById("loginMsg");

    const persistence = remember
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    auth.setPersistence(persistence)
      .then(() => auth.signInWithEmailAndPassword(email, password))
      .then(() => {
        msg.textContent = "Login successful!";
        window.location.href = "dashboard.html";
      })
      .catch(() => {
        msg.textContent = "Invalid Credentials";
      });
  });
}

// Auth Guard on Dashboard
if (window.location.pathname.includes("dashboard.html")) {
  auth.onAuthStateChanged(user => {
    if (user) {
      const name = localStorage.getItem("userName") || user.email;
      document.getElementById("welcomeMsg").textContent = `Welcome back, ${name}!`;
    } else {
      window.location.href = "index.html";
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", function () {
    auth.signOut().then(() => {
      localStorage.removeItem("userName");
      window.location.href = "index.html";
    });
  });
}
