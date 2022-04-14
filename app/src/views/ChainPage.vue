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
      :currentIndex="skip + 1"
      :lastIndex="lastPageIndex"
      @pageChange="handlePageChange"
      class="pagination"
    />
    <button v-if="skip + 1 === lastPageIndex" id="mineBtn" @click="mine">
      MINE ⛏️
    </button>
    <base-loader v-if="loading" />
  </div>
</template>

<script>
import CustomBlock from "../components/CustomBlock.vue";

export default {
  components: { CustomBlock },
  data() {
    return {
      take: 3,
      skip: Number(this.$route.query.page) - 1 || 0,
      chainLength: "",
      blocks: [],
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    await this.setProps();
    this.loading = false;
  },
  computed: {
    lastPageIndex() {
      return Math.ceil(this.chainLength / this.take);
    },
  },
  methods: {
    async setProps() {
      await this.fetchLength();
      await this.fetchBlocks();
    },
    async fetchBlocks() {
      this.blocks = await (
        await fetch(
          `http://localhost:8000/chain?take=${this.take}&skip=${this.skip}`
        )
      ).json();
    },
    async fetchLength() {
      this.chainLength = (
        await (await fetch("http://localhost:8000/chain/length")).json()
      ).length;
    },
    handlePageChange(newPageIdx) {
      this.skip = newPageIdx - 1;
      this.$router.push(this.$route.path + `?page=${newPageIdx}`);
      this.setProps();
    },
    async mine() {
      this.loading = true;
      await (await fetch(`http://localhost:8000/next`)).json();
      this.setProps();
      this.loading = false;
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
#mineBtn {
  position: fixed;
  bottom: 3rem;
  left: 70%;
  transform: translateX(-50%) translateY(-10%);
  height: 2.5rem;
  width: 8.5rem;
  border-radius: 10px;
  background-color: #9013fe;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  text-shadow: 2px 2px black;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}

#mineBtn:hover {
  text-shadow: 2px 0 black;
  height: 2.2rem;
  width: 8rem;
  font-size: 1.25rem;
  transform: translateX(-50%) translateY(-20%);
}

@media only screen and (max-width: 1392px) {
  .latestBlocks {
    flex-direction: column;
    position: absolute;
    top: 5rem;
    transform: translateX(-50%) translateY(0);
  }

  .latestBlocks {
    padding-bottom: 5rem;
  }

  .pagination {
    margin-bottom: 1rem;
  }

  #mineBtn {
    left: 85%;
    bottom: 2rem;
  }
}

@media only screen and (max-width: 952px) {
  #mineBtn {
    left: 88%;
    bottom: 2rem;
  }
}
</style>