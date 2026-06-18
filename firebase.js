const firebaseConfig = {
  apiKey: "AIzaSyCEiKZs-a88YDgHk9gYInC2tELts5TeBWI",
  authDomain: "financial-advisor-app-ba4e5.firebaseapp.com",
  projectId: "financial-advisor-app-ba4e5",
  storageBucket: "financial-advisor-app-ba4e5.appspot.com",
  messagingSenderId: "388509714885",
  appId: "1:388509714885:web:0da4839bcaacf1911d23ac"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
