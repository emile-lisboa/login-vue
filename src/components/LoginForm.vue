<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <p class="subtitle">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <form class="form" autocomplete="off">
      <div class="form__item">
        <input
          class="form__input"
          type="text"
          placeholder="Email"
          name="uemail"
          v-model="email"
          required
        />
        <input
          class="form__input"
          type="password"
          placeholder="Senha"
          v-model="password"
          name="psw"
          required
        />
      </div>

      <div class="form__item">
        <button
          class="form__btn"
          type="submit"
          @click.stop.prevent="logarEmailSenha()"
        >
          Entrar
        </button>
        <button
          class="form__btn form__google flex__center"
          @click.stop.prevent="logarGoogle()"
        >
          <img class="icon" src="../assets/google_icon.svg" />
          <span class="span">Entrar com Google</span>
        </button>
        <p>
          Não está cadastrado?
          <router-link to="/signup">Criar uma conta</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const email = ref('')
    const password = ref('')
    const store = useStore()

    const logarEmailSenha = () => {
      const emailValue = email.value
      const passwordValue = password.value

      if (emailValue.length < 5) {
        alert('Please enter an email address.')
        return
      }
      if (passwordValue.length < 8) {
        alert('Please enter a password with at least 8 characters.')
        return
      }
      store.dispatch('login', { email: emailValue, password: passwordValue })
    }

    const logarGoogle = () => {
      store.dispatch('loginGoogle')
    }

    return { email, password, logarEmailSenha, logarGoogle }
  },
  name: 'LoginForm'
}
</script>

<style lang="scss"></style>
