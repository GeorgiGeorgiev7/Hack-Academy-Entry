<template>
  <div>
    <div class="latestBlocks center">
      <custom-block
        v-for="block in blocks"
        :key="block.hash"
        :blockHeight="block.index"
        :timestamp="block.timestamp"
        :nonce="block.nonce"
        :previousHash="'0x' + block.previousHash"
        :hash="'0x' + block.hash"
        class="latestBlocks-block"
      />
    </div>
    <base-pagination
      :currentIndex="skip"
      :lastIndex="lastPageIndex"
      class="pagination"
    />
  </div>
</template>

<script>
import CustomBlock from "../components/CustomBlock.vue";

export default {
  components: { CustomBlock },
  data() {
    return {
      take: 3,
      skip: 1,
      chainLength: "",
      blocks: [],
    };
  },
  async created() {
    this.fetchLength();
    this.fetchBlocks();
  },
  computed: {
    lastPageIndex() {
      return Math.ceil(this.chainLength / this.take);
    },
  },
  methods: {
    async fetchBlocks() {
      this.blocks = await (
        await fetch(
          `http://localhost:8000/chain?take=${this.take}&skip=${this.skip - 1}`
        )
      ).json();
    },
    async fetchLength() {
      this.chainLength = (
        await (await fetch("http://localhost:8000/chain/length")).json()
      ).length;
      console.log(this.lastPageIndex);
    },
  },
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
    margin-top: 25rem;
  }

  .latestBlocks {
    padding-bottom: 5rem;
  }

  .pagination {
    margin-bottom: 1rem;
  }
}
</style>