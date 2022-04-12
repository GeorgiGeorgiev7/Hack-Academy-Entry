<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/hash">Hash</router-link> |
      <router-link to="/block">Block</router-link> |
      <router-link to="/chain">Chain</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view class="view" v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
html {
  cursor: default;
  background-image: url(https://hack.bg/wp-content/themes/hackblockchain/assets/images/bg.svg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  font-size: 2rem;
  text-transform: capitalize;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #9013fe;
}

.route-enter-from {
  opacity: 0;
}
.route-leave-to {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
}
</style>
