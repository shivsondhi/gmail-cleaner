<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <img class="navbar float-left" src="./assets/gmail-logo.png">
        <a class="navbar-brand float-left" style="font-size:45px;">GMAIL INBOX CLEANER</a>
        <ul class="nav navbar-nav flex-row float-right" style="font-size:25px;">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/connected">CLEAN</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/help">HELP</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-5">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Calibri, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

img {
  height: 3%;
  width: 10%;
}

li {
  padding: 8px;
}
</style>
