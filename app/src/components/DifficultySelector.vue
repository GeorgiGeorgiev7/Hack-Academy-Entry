<template>
  <select v-model="value">
    <option value="">Difficulty</option>
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
</template>

<script>
export default {
  emits: ["switch"],
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value() {
      this.$emit("switch", this.value);
    },
  },
};
</script>

<style scoped>
select {
  width: 8rem;
  padding: 0.1rem 0.5rem;
  text-align: center;
  font-size: 1.4rem;
  border: 2px solid #9013fe;
  border-radius: 10px;
}

</style>