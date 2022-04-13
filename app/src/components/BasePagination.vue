<template>
  <base-card class="container">
    <div v-if="currentIndex !== 1" id="left" class="control">&lt;</div>
    <div v-if="currentIndex > 2" id="first" class="control">1</div>
    <div id="previous" class="control">{{ currentIndex - 1 }}</div>
    <div id="current" class="control">{{ currentIndex }}</div>
    <div id="next" class="control">{{ currentIndex + 1 }}</div>
    <div v-if="lastIndex - 1 > currentIndex" id="last" class="control">
      {{ lastIndex }}
    </div>
    <div v-if="currentIndex !== lastIndex" id="right" class="control">&gt;</div>
  </base-card>
</template>

<script>
import BaseCard from "./BaseCard.vue";
export default {
  components: { BaseCard },
  props: {
    currentIndex: {
      type: Number,
      required: true,
    },
    lastIndex: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 40rem;
  height: 4rem;
  background-color: #9013fe;
  box-shadow: 0 0 10px 5px rgb(255, 0, 0);
}
.control {
  padding: 0.5rem;
  color: rgb(184, 184, 184);
  text-shadow: 1px 1px black;
}

#current {
  color: white;
  text-shadow: 2px 2px black;
}
</style>