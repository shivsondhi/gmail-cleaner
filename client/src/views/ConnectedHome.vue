<template>
  <div class="home">
    <Connected msg="Clean your inbox quicker"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Connected from '@/components/Connected.vue';

export default {
  name: 'Home',
  components: {
    Connected,
  },
};
</script>
