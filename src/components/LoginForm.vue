<template>
  <form class="form">              
        <div class="form__container">
            <div class="form__item">
                <input class="form__input" type="text" placeholder="Email" name="uname" v-model="email"  required>
                <input class="form__input" type="password" placeholder="Senha" v-model="password" name="psw" required>
            </div>
        
            <button class="form__btn" type="submit" @click.stop.prevent="logarEmailSenha()">Entrar</button>
            <button class="form__btn" @click.stop.prevent="logarGoogle()">Entrar com Google</button>
            <p>Não está cadastrado?<router-link to="/home">Cadastre-se aqui.</router-link></p>

    </div>
    </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import store from '@/store'
import router from '@/router/index'
import firebase from "firebase/app";
import "firebase/auth";
export default{
    setup(){
        var firebaseConfig = {
            apiKey: "AIzaSyDn0QGzakyqFWhysIsSdq4mauk2AyAaoXU",
            authDomain: "testelogin-7676b.firebaseapp.com",
            projectId: "testelogin-7676b",
            storageBucket: "testelogin-7676b.appspot.com",
            messagingSenderId: "263468731148",
            appId: "1:263468731148:web:a44bba2b01cf0061d49729"
        };

        const firebaseApp = firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(firebaseConfig)
        
        
        const email = ref('')
        const password = ref('')

        if (firebase.auth().currentUser) {     
            store.commit('setUser', {});    
            firebase.auth().signOut();
        }


        const logarEmailSenha = ()=>{
             if (firebase.auth().currentUser) {
                router.push('/home');
            } else {
                var emailValue = email.value;
                var passwordValue = password.value;
                if (emailValue.length < 5) {
                    alert('Please enter an email address.');
                    return;
                }
                if (passwordValue.length < 8) {
                    alert('Please enter a password with at least 8 characters.');
                    return;
                }
                firebaseApp.auth().signInWithEmailAndPassword(emailValue, passwordValue)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    store.commit('setUser', {
                        display_name: user?.displayName,
                        email: user?.email,
                        uid: user?.uid
                    });
                    router.push('/home');
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                     if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else if(errorCode === 'auth/invalid-email'){
                        alert('Please enter an email address.');
                    }else if(errorCode === 'auth/user-not-found') {
                        alert('Email doesnt exists. Please sign up and try again.');
                    }else {
                        alert(errorMessage);
                    }
                });
            }
        }

        const logarGoogle = ()=>{
            if (firebase.auth().currentUser) {
                router.push('/home');
            } else {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                firebaseApp.auth()
                .signInWithPopup(provider)
                .then((result) => {
                    var user = result.user;
                    store.commit('setUser', {
                        display_name: user?.displayName,
                        email: user?.email,
                        uid: user?.uid
                    });
                    router.push('/home');
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    console.log(''+errorCode + ' '+errorMessage+' '+email+' '+credential);
                });
            }
        }
        if (firebase.auth().currentUser) {
            router.push('/home');
        }
        
        return {email, password, firebaseApp, logarEmailSenha, logarGoogle}
    },
    
    mounted() {
        console.log(store.getters.getUser)
    },
    name:'LoginForm',

}
</script>

<style lang="scss">
.form{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &__container{
        width: 50%;
        padding: 20% 0;
        margin: auto;
        max-height: 100%;  
    }

    &__input{
        display: block;
        margin: auto;
    }
}
</style>