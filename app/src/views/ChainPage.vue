<template>
  <div>
    <div class="latestBlocks center">
      <custom-block
        :blockHeight="1"
        :timestamp="new Date().toUTCString()"
        :nonce="56161"
        :previousHash="'002a0fsd20gs3fv'"
        :hash="'lifd3516035fd'"
        class="latestBlocks-block"
      />
      <custom-block
        :blockHeight="2"
        :timestamp="new Date().toUTCString()"
        :nonce="2315"
        :previousHash="'002a0fsd20gs3fv'"
        :hash="'lifd3516035fd'"
        class="latestBlocks-block"
      />
      <custom-block
        :blockHeight="3"
        :timestamp="new Date().toUTCString()"
        :nonce="98409"
        :previousHash="'002a0fsd20gs3fv'"
        :hash="'lifd3516035fd'"
        class="latestBlocks-block"
      />
    </div>
    <base-pagination :currentIndex="7" :lastIndex="42" class="pagination" />
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
  font-size: 0.9rem;
  width: 25rem;
  height: 25rem;
  margin: 2rem;
}

.latestBlocks-block:first-child,
.latestBlocks-block:last-child {
  width: 22rem;
  height: 22rem;
  margin: 2rem;
}

.pagination {
  position: fixed;
  bottom: 0;
  left: 50%;
  font-size: 2.2rem;
  transform: translateX(-50%) translateY(-10%);
  width: 20rem;
  height: 4rem;
  margin-bottom: 2rem;
}

@media only screen and (max-width: 1392px) {
  .latestBlocks {
    flex-direction: column;
    margin-top: 30rem;
  }

  .latestBlocks {
    padding-bottom: 5rem;
  }

  .latestBlocks-block:first-child,
  .latestBlocks-block:last-child {
    width: 25rem;
    height: 25rem;
    margin: 2rem;
  }

  .pagination {
    margin-bottom: 1rem;
  }
}
</style>