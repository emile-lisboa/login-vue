<template>
  <form >              
        <div class="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" v-model="email"  required>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" v-model="password" name="psw" required>
        
            <button type="submit" @click="logarEmailSenha()">Login</button>
            <button type="submit" @click="logarGoogle()">Login com Google</button>
        </div>
    </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import firebase from "firebase/app";
import "firebase/auth";
export default{
    setup(){
        
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
        const firebaseApp = firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(firebaseConfig)
        const email = ref('email')
        const password = ref('password')
        const logarEmailSenha = ()=>{
             if (firebase.auth().currentUser) {
                firebase.auth().signOut();
            } else {
                if (email.value.length < 5) {
                    alert('Please enter an email address.');
                    return;
                }
                if (password.value.length < 8) {
                    alert('Please enter a password with at least 8 characters.');
                    return;
                }
                firebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('erro: '+errorCode+' '+errorMessage)
                    // ..
                });
            }
        }

        const logarGoogle = ()=>{
             if (!firebase.auth().currentUser) {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                firebaseApp.auth()
                .signInWithPopup(provider)
                .then((result) => {
                    var credential = result.credential as firebase.auth.OAuthCredential;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    console.log(''+token + ' '+user?.displayName);
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    console.log(''+errorCode + ' '+errorMessage+' '+email+' '+credential);
                    // ...
                });
            }
        }
        return {email, password, firebaseApp, logarEmailSenha, logarGoogle}
    },
    name:'LoginForm',

}
</script>

