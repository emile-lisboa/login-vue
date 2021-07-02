<template>
    <router-view>
    </router-view>
</template>
<script lang="ts">
import firebase from "firebase/app";
import "firebase/auth";
export default{
  
    setup(){
        var firebaseConfig = {
            apiKey: process.env.FIREBASE_apiKey,
            authDomain: process.env.FIREBASE_authDomain,
            projectId: process.env.FIREBASE_projectId,
            storageBucket: process.env.FIREBASE_storageBucket,
            messagingSenderId: process.env.FIREBASE_messagingSenderId,
            appId: process.env.FIREBASE_appId
        };

        const firebaseApp = firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(firebaseConfig)
        return{firebaseApp}
    },
}
</script>
<style lang="scss">
:root {
  --lightolivegreen: #AAB597;
  --whitelikeolivegreen: #F6F7F4;
}
*{
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
  color: darkolivegreen;
}
a{
  color:darkgreen;
  font-weight: bold;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.875rem; //14px
}
.flex{
  display: flex;

  &__center{
    justify-items: center;
    align-items: center;
  }
}


.container{
    width: 100%;
    margin: 5%;
}

.title{
    margin-bottom: 3%;
    color: darkolivegreen;
    font-weight: bolder;
}

.subtitle{
    margin-bottom: 4rem;
    color: var(--lightolivegreen);
    padding: 0 4.5rem;
}
.form{
    width: 50%;
    margin: auto;
    max-height: 100%;  

    &__item{
        margin-bottom: 3.5rem;
    }

    &__input{
        display: block;
        margin: 5% auto;
        width: 100%;
        border: none;
        border-left: 8px solid darkolivegreen;
        padding: 0.75rem;
        background: var(--whitelikeolivegreen);
    }
    &__input:focus{
      outline: none;
      border-left-color: var(--lightolivegreen);
    }
    &__btn{
        display: block;
        width: 100%;
        background: darkolivegreen;
        color: white;
        margin: 5% auto;
        border-radius: 1.5rem;
        border: 1px solid var(--lightolivegreen);
        padding: 1rem;
        font-weight: bold
    }

    &__btn:hover{
      cursor: pointer;
        background: var(--lightolivegreen);
    }
    
    &__google{
      background: white;
      border: 0.5px solid darkolivegreen;
      color: darkolivegreen;
    }

    &__google:hover{
      background: var(--whitelikeolivegreen);
      border: 0.5px solid var(--lightolivegreen);
    }
}
.icon{
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  margin-right: 5%;
}

.span{
  vertical-align: middle;
}

</style>
