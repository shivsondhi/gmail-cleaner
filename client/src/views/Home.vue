<template>
  <div class="home">
    <Connect msg="Clean your inbox quicker"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Connect from '@/components/Connect.vue';

export default {
  name: 'Home',
  components: {
    Connect,
  },
};
</script>
