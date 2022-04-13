<template>
  <div>
    <base-card class="container center">
      <div id="input">
        <label for="data">Enter any text you want:</label>
        <input
          id="input-data"
          type="text"
          v-model="input"
          @blur="PoW(input)"
          placeholder="For example: 'hack' ;)"
        />
      </div>
      <div id="output">
        <label for="data">Hashed value using sha256:</label>
        <input id="output-data" type="text" disabled v-model="hash" />
      </div>
      <difficulty-selector
        @switch="setDifficulty"
        class="difficulty-selector"
      />
    </base-card>
    <base-loader v-if="loading" />
  </div>
</template>

<script>
import sha256 from "crypto-js/sha256";
import DifficultySelector from "../components/DifficultySelector.vue";

export default {
  components: { DifficultySelector },
  data() {
    return {
      input: "",
      difficulty: 0,
      hash: sha256("").toString(),
      loading: false,
    };
  },
  methods: {
    setDifficulty(difficulty) {
      this.difficulty = Number(difficulty);
      this.PoW(this.input);
    },
    PoW(data) {
      if (this.difficulty === 0) {
        console.log(data.length);
        this.hash = sha256(data).toString();
      }
      let nonce = 0;
      this.loading = true;
      while (
        sha256(data + nonce)
          .toString()
          .slice(0, this.difficulty) != Array(this.difficulty + 1).join("0")
      ) {
        nonce++;
      }
      this.hash = sha256(data + nonce).toString();
      this.loading = false;
    },
  },
};
</script>


<style scoped>
.container {
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 15rem;
  width: 32rem;
  padding: 2rem 4rem;
}

#input,
#output {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20%;
}

#input-data {
  border: 2px solid #2c3e50;
  border-radius: 10px;
  padding: 0.1rem 0.25rem;
  text-align: center;
  font-size: 1.2rem;
  margin: 0 1rem;
}

#output-data {
  padding: 0 0 0 0.5rem;
  font-size: 1.2rem;
  margin: 0 1rem;
}

label {
  font-size: 1.4rem;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
}

.difficulty-selector {
  position: absolute;
  bottom: 0;
  right: 20%;
  transform: translateY(50%);
}
</style>