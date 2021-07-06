<template>
  <div class="container">
    <h1 class="title">Criar conta</h1>
    <form class="form" autocomplete="off">
      <div class="form__item">
        <input
          class="form__input"
          type="text"
          placeholder="Nome"
          name="uname"
          v-model="nome"
          required
        />
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
        <input
          class="form__input"
          type="password"
          placeholder="Confirme sua senha"
          v-model="password2"
          name="psw2"
          required
        />
      </div>

      <div class="form__item">
        <button
          class="form__btn"
          type="submit"
          @click.stop.prevent="criarConta()"
        >
          Registrar-se
        </button>
        <button
          class="form__btn form__google flex__center"
          @click.stop.prevent="logarGoogle()"
        >
          <img class="icon" src="../assets/google_icon.svg" />
          <span class="span">Registrar-se com Google</span>
        </button>
        <p>
          Já possui uma conta? <router-link to="/">Fazer login</router-link>
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
    const nome = ref('')
    const email = ref('')
    const password = ref('')
    const password2 = ref('')
    const store = useStore()

    const criarConta = () => {
      if (password.value !== password2.value) {
        alert(
          'As senhas não são iguais. Confirme sua senha e tente novamente. '
        )
      } else {
        const emailValue = email.value
        const passwordValue = password.value
        const nomeValue = nome.value
        if (emailValue.length < 5) {
          alert('Por favor insira um email válido.')
          return
        }
        if (passwordValue.length < 8) {
          alert('Please enter a password with at least 8 characters.')
          return
        }
        store.dispatch('createAccount', { email: emailValue, password: passwordValue, name: nomeValue })
      }
    }

    const logarGoogle = () => {
      store.dispatch('loginGoogle')
    }

    return { nome, email, password, password2, criarConta, logarGoogle }
  },
  name: 'SignUpForm'
}
</script>
