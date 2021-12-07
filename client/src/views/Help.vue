<template>
  <div class="help">
    <Instructions msg="INSTRUCTIONS"/>
  </div>
</template>

<script>
import Instructions from '@/components/Instructions.vue';

export default {
  name: 'Help',
  components: {
    Instructions,
  },
};
</script>
