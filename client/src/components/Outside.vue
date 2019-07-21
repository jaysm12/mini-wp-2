<template>
  <div id="outside">
    <LoginForm v-if="type == 'login'" class="form" @login="$emit('login')"></LoginForm>
    <RegisterForm v-if="type == 'register'" class="form" @toLogin="toLogin"></RegisterForm>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
export default {
  name: 'outside',
  props: ['type'],
  data() {
    return {

    }
  },
  methods: {
    toLogin() {
      this.type = 'login'
    }
  },
  components: {
    LoginForm,
    RegisterForm
  }
}
</script>

<style>
  #outside {
    padding-top: 90px;
  }
</style>
