<template>
  <base-card class="container">
    <div v-if="currentIndex > 1" id="left" class="control active">&lt;</div>
    <div class="separator">|</div>
    <div v-if="currentIndex > 2" id="first" class="control">1</div>
    <div v-if="currentIndex > 1" id="previous" class="control">
      {{ currentIndex - 1 }}
    </div>
    <div id="current" class="control active">{{ currentIndex }}</div>
    <div v-if="currentIndex < 1" id="next" class="control">
      {{ currentIndex + 1 }}
    </div>
    <div v-if="currentIndex < lastIndex" id="last" class="control">
      {{ lastIndex }}
    </div>
    <div class="separator">|</div>
    <div v-if="currentIndex < lastIndex" id="right" class="control active">
      &gt;
    </div>
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
  background-color: #ffffff;
  border: 2px solid #9013fe;
  box-shadow: 0 0 15px #000000;
  font-size: 2.2rem;
  padding: 0 0.5rem;
}
.control {
  padding: 0.5rem;
  color: rgb(172, 172, 172);
  cursor: pointer;
}
.control:hover {
  color: #9013fe71;
}

.active {
  color: #9013fe;
  text-shadow: 1px 1px #000000;
  transition: all 0.25s ease-in-out;
}

.active:hover {
  font-size: 2.4rem;
}

.separator {
  padding-bottom: 5px;
}
</style>