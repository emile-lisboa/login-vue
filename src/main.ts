import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase/app";
import "firebase/auth";


// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDn0QGzakyqFWhysIsSdq4mauk2AyAaoXU",
authDomain: "testelogin-7676b.firebaseapp.com",
projectId: "testelogin-7676b",
storageBucket: "testelogin-7676b.appspot.com",
messagingSenderId: "263468731148",
appId: "1:263468731148:web:a44bba2b01cf0061d49729"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
