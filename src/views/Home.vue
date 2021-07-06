<template>
  <div class="bg__sala">
    <div class="brand">
      <img class="brand__logo" src="../assets/brand_logo.png" />
    </div>
    <h1 class="phrase phrase__title" align="right">
      "oh home, let me go home....home is wherever I'm with you"
    </h1>
    <h3 class="phrase__author" align="right">
      Edward Sharpe and the Magnetic Zeros - Home
    </h3>
    <div class="user__info" align="right">
      <h1 class="title">Bem vindo(a), {{ user.display_name }}!</h1>
      <button
        class="form__btn logout__btn"
        type="button"
        @click.stop.prevent="logout()"
      >
        Sair
      </button>
    </div>
    <div class="footer" align="center">
      <a class="footer__link" href="https://br.freepik.com/fotos/casa">
        Casa foto criado por vanitjan - br.freepik.com
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const user = store.getters.getUser
    const logout = () => {
      store.dispatch('logout')
    }
    return { user, logout }
  }
}
</script>

<style lang="scss">
.bg__sala {
  background: url("../assets/sala.jpg") no-repeat center;
  background-size: cover;
  height: 100vh;
}
.phrase {
  &__title {
    width: 100%;
    padding: 8rem 5rem;
    padding-bottom: 0;
    font-size: 3.5rem;
    font-family: "Caveat", cursive;
  }
  &__author {
    width: 100%;
    padding: 1.5rem 5rem;
  }
}
.user__info {
  margin-top: 5%;
  padding: 4.5rem 5rem;

  .logout__btn {
    width: 10%;
    margin: 0;
  }
}
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;

  &__link {
    text-decoration: none;
    color: darkolivegreen;
  }
}
</style>
