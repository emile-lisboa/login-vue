<template>
<div class="bg__sala">
  <h1 align="right">"oh home, let me go home....home is wherever I'm with you"</h1>
  <h3  align="right">Edward Sharpe and the Magnetic Zeros - Home</h3>
  <h1>nome do user {{user.display_name}}</h1>
  <button type="button" @click.stop.prevent="logout()">Logout</button>
  <div class="footer" align="center">
    <router-link class="footer__link" to="https://br.freepik.com/fotos/casa">Casa foto criado por vanitjan - br.freepik.com</router-link>
  </div>
</div>
</template>

<script lang="ts">
import store from '@/store'
import firebase from "firebase/app";
import "firebase/auth";
import router from '@/router/index'
export default{
  setup(){
    if (!firebase.auth().currentUser) {     
        router.push('/');
    }
    const user = store.getters.getUser;
      const logout = () => {
        store.commit('setUser', {});
        firebase.auth().signOut().
                  then(() => {
                      router.push('/');
                  })
                  .catch((error) => {
                      var errorMessage = error.message;
                      alert(errorMessage);
                  });
      }
      return{user,logout}
  },

}
</script>

<style lang="scss">
.bg__sala{
  background: url("../assets/sala.jpg") no-repeat center;
  background-size: cover;
  height: 100vh;
}
h1{
  width: 100%;
  padding: 10rem 5rem;
  padding-bottom: 0;
  font-size: 3.5rem;
  font-family: 'Caveat', cursive;
}
h3{
  width: 100%;
  padding: 1.5rem 5rem;
  font-family: 'Open Sans', sans-serif;
}
.footer{
  width: 100%;
  position: absolute;
  bottom: 0;

  &__link{
    text-decoration: none;
    color: darkolivegreen;
  }
}
</style>