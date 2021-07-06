<template>
  <div class="flex flex__center login login__wrapper">
    <div class="login__container login__form-container">
      <div class="brand">
        <img class="brand__logo" src="../assets/brand_logo.png" />
      </div>
      <img class="login__bg" src="../assets/office.svg" />
      <div class="greetings">
        <h1 class="greetings__title">Lorem Ipsum</h1>
        <p class="greetings__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </p>
      </div>
    </div>
    <div class="login__container flex flex__center">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts">
export default {
}
</script>

<style lang="scss">
.login {
  &__wrapper {
    height: 100vh;
    width: 100%;
  }
  &__container {
    height: 100%;
    width: 50%;
  }
  &__form-container {
    background: var(--lightolivegreen);
  }
  &__bg {
    width: 90%;
    padding: 0 1.5rem;
  }
}
.brand {
  width: 100%;
  text-align: start;
  &__logo {
    height: 5rem;
    padding: 0 3rem;
  }
}
.greetings {
  color: var(--whitelikeolivegreen);
  &__title {
    font-size: 4.5rem;
    font-family: "Caveat", cursive;
  }

  &__text {
    padding: 0.5rem 1.5rem;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: margin-right .5s ease, opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  margin-right: 0;
  opacity: 0;
}

</style>
