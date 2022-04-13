<template>
  <div>
    <custom-block
      :blockHeight="blockHeight"
      :timestamp="new Date().toUTCString()"
      :nonce="nonce"
      :previousHash="previousHash"
      :hash="hash"
      class="custom-block center"
      @data="setData"
    >
      <button id="mineBtn" @click="mine">MINE ⛏️</button>
      <difficulty-selector @switch="setDifficulty" id="difficulty-selector" />
    </custom-block>
    <base-loader v-if="loading" />
  </div>
</template>

<script>
import sha256 from "crypto-js/sha256";
import CustomBlock from "../components/CustomBlock.vue";
import DifficultySelector from "../components/DifficultySelector.vue";

export default {
  components: { CustomBlock, DifficultySelector },
  data() {
    return {
      blockHeight: 1,
      timestamp: new Date().toUTCString(),
      nonce: 0,
      previousHash: "0",
      data: "",
      hash: sha256(
        this.blockHeight +
          this.timestamp +
          this.nonce +
          this.previousHash +
          this.data
      ).toString(),
      difficulty: 0,
      loading: false,
    };
  },
  methods: {
    setDifficulty(difficulty) {
      this.difficulty = Number(difficulty);
    },
    setData(data) {
      this.data = data;
    },
    mine() {
      this.previousHash = this.hash;
      if (this.difficulty === 0) {
        this.hash = sha256(
          this.blockHeight +
            this.timestamp +
            this.nonce +
            this.previousHash +
            this.data
        ).toString();
        this.blockHeight++;
        return;
      }
      this.nonce = 0;
      this.loading = true;
      while (
        sha256(this.data + this.nonce)
          .toString()
          .slice(0, this.difficulty) != Array(this.difficulty + 1).join("0")
      ) {
        this.nonce++;
      }
      this.hash = sha256(this.data + this.nonce).toString();
      this.blockHeight++;
      console.log(this.blockHeight);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.custom-block {
  height: 33rem;
  width: 33rem;
}

#mineBtn {
  position: absolute;
  bottom: 0;
  transform: translateX(-50%) translateY(50%);
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
}

#difficulty-selector {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(-20%) translateY(50%);
  font-size: 1.2rem;
  cursor: pointer;
}
</style>