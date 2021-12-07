<template>
  <div class="connect">
    <h1>{{ msg }}</h1>
    <form v-on:submit='login'>
      <input type="submit" value="Connect Google"/>
    </form>
  </div>
</template>

<script>
// import router from '../router';
import axios from 'axios';

export default {
  name: 'Connect',
  props: {
    msg: String,
  },
  methods: {
    login: (e) => {
      e.preventDefault();
      const login = () => {
        axios.get('http://localhost:4000/auth/google');
      };
      login();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-style: oblique;
  font-size: 25px;
}
</style>
