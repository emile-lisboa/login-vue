<template>
    <div class="container">
        <h1 class="title">Login</h1>
        <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <form class="form">              
            <div class="form__item">
                <input class="form__input" type="text" placeholder="Email" name="uemail" v-model="email"  required>
                <input class="form__input" type="password" placeholder="Senha" v-model="password" name="psw" required>
            </div>
            
            <div class="form__item">
                <button class="form__btn" type="submit" @click.stop.prevent="logarEmailSenha()">Entrar</button>
                <button class="form__btn form__google flex__center" @click.stop.prevent="logarGoogle()">
                    <img class="icon" src="../assets/google_icon.svg"> 
                    <span class="span">Entrar com Google</span>
                </button>
                <p>Não está cadastrado? <router-link to="/signup">Criar uma conta</router-link></p>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import store from '@/store'
import router from '@/router/index'
import firebase from "firebase/app";
import "firebase/auth";
export default{
    setup(){
        
        const email = ref('')
        const password = ref('')

        if (firebase.auth().currentUser) {     
            store.commit('setUser', {});    
            firebase.auth().signOut();
        }


        const logarEmailSenha = ()=>{
             if (firebase.auth().currentUser) {
                var user = firebase.auth().currentUser;
                store.commit('setUser', {
                    display_name: user?.displayName,
                    email: user?.email,
                    uid: user?.uid
                });
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
                firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
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
                var user = firebase.auth().currentUser;
                    store.commit('setUser', {
                        display_name: user?.displayName,
                        email: user?.email,
                        uid: user?.uid
                });
                router.push('/home');
            } else {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                firebase.auth()
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
        
        return {email, password, logarEmailSenha, logarGoogle}
    },
    name:'LoginForm',

}
</script>

<style lang="scss">
</style>