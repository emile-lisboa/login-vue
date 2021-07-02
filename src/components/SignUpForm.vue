<template>              
    <div class="container">
        <h1 class="title">Criar conta</h1>
        <form class="form">
            <div class="form__item">
                <input class="form__input" type="text" placeholder="Nome" name="uname" v-model="nome"  required>
                <input class="form__input" type="text" placeholder="Email" name="uemail" v-model="email"  required>
                <input class="form__input" type="password" placeholder="Senha" v-model="password" name="psw" required>
                <input class="form__input" type="password" placeholder="Confirme sua senha" v-model="password2" name="psw2" required>
            </div>
        
            <div class="form__item">
                <button class="form__btn" type="submit" @click.stop.prevent="criarConta()">Registrar-se</button>
                <button class="form__btn form__google flex__center" @click.stop.prevent="logarGoogle()">
                    <img class="icon" src="../assets/google_icon.svg"> 
                    <span class="span">Registrar-se com Google</span>
                </button>
                <p>Já possui uma conta? <router-link to="/">Fazer login</router-link></p>
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
        
        
        const nome = ref('')
        const email = ref('')
        const password = ref('')
        const password2 = ref('')

        if (firebase.auth().currentUser) {     
            store.commit('setUser', {});    
            firebase.auth().signOut();
        }


        const criarConta = ()=>{
            if(password.value!==password2.value){
                alert('As senhas não são iguais. Confirme sua senha e tente novamente. ');
            }else{
                if (firebase.auth().currentUser) {
                    router.push('/home');
                } else {
                    var emailValue = email.value;
                    var passwordValue = password.value;
                    if (emailValue.length < 5) {
                        alert('Por favor insira um email válido.');
                        return;
                    }
                    if (passwordValue.length < 8) {
                        alert('Please enter a password with at least 8 characters.');
                        return;
                    }
                    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
                    .then((userCredential) => {
                        var user  = userCredential.user;
                        if(user){
                            user.updateProfile({
                                displayName: nome.value,
                            }).then(() => {
                                store.commit('setUser', {
                                    display_name: user?.displayName,
                                    email: user?.email,
                                    uid: user?.uid
                                });
                                router.push('/home');
                            }).catch((error) => {
                                var errorMessage = error.message;
                                alert('Houve um erro ao registrar-se. Tente novamente mais tarde. '+ errorMessage);
                            });
                        }else{
                            alert('Houve um erro ao registrar-se.');
                        }
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                       if (errorCode == 'auth/weak-password') {
                            alert('The password is too weak.');
                        } else {
                            alert(errorMessage);
                        }
                    });
                }
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
        
        return {nome, email, password, password2, criarConta, logarGoogle}
    },
    name:'SignUpForm',

}
</script>