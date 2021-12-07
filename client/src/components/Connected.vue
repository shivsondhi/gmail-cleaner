<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1 class="text-center">{{ msg }}</h1>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label>Enter Your Query</label>
          <input type="text" class="form-control" v-model="cleaner.query" required>
        </div>
        <div class="form-group">
          <button class="btn btn-outline-dark btn-block m-1">Delete</button>
          <button class="btn btn-danger btn-block m-1">Trash</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Connect',
  props: {
    msg: String,
  },
  data() {
    return {
      cleaner: {
        query: '',
      },
    };
  },
  methods: {
    handleSubmitForm() { },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-style: oblique;
  font-size: 40px;
}

label {
  font-size: 30px;
  margin-top: 25px;
  padding: 25px;
}

.form-group {
  padding: 10px;
}

.form-group .btn {
  padding: 10px;
}
</style>
