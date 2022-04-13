<template>
  <div class="latestBlocks center">
    <custom-block :displayData="false" class="latestBlocks-block" />
    <custom-block :displayData="false" class="latestBlocks-block" />
    <custom-block :displayData="false" class="latestBlocks-block" />
  </div>
</template>

<script>
import CustomBlock from "../components/CustomBlock.vue";

export default {
  components: { CustomBlock },
};
</script>

<style scoped>
.latestBlocks {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;
}

.latestBlocks-block {
  width: 25rem;
  height: 25rem;
  margin: 2rem;
}

@media only screen and (max-width: 1392px) {
  .latestBlocks {
    flex-direction: column;
    margin-top: 30rem;
  }
}
</style>