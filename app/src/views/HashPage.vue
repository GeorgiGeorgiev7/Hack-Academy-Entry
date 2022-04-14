<template>
  <div>
    <base-card class="container center">
      <div id="input" class="data">
        <label for="data">Enter any text you want:</label>
        <input
          class="input-data"
          type="text"
          v-model="input"
          @blur="PoW(input)"
          placeholder="For example: 'hack' ;)"
        />
      </div>
      <div class="data">
        <label for="data">Nonce:</label>
        <input class="output-data" type="text" disabled v-model="nonce" />
      </div>
      <div id="output" class="data">
        <label for="data">Hashed value using sha256:</label>
        <input class="output-data" type="text" disabled v-model="hash" />
      </div>
      <difficulty-selector
        @switch="setDifficulty"
        class="difficulty-selector"
      />
    </base-card>
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
      nonce: "",
    };
  },
  methods: {
    setDifficulty(difficulty) {
      this.difficulty = Number(difficulty);
      this.PoW(this.input);
    },
    async PoW(data) {
      this.nonce = "thinking...";
      this.hash = "thinking...";
      const { hash, nonce } = await (
        await fetch("http://localhost:8000/hash", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data, difficulty: this.difficulty }),
        })
      ).json();
      this.nonce = nonce;
      this.hash = hash;
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

.data {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20%;
}

.input-data {
  border: 2px solid #2c3e50;
  border-radius: 10px;
  padding: 0.1rem 0.25rem;
  text-align: center;
  font-size: 1.2rem;
  margin: 0 1rem;
}

.output-data {
  padding: 0 0 0 0.5rem;
  font-size: 1.2rem;
  margin: 0 1rem;
  text-align: center;
}

label {
  font-size: 1.4rem;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  width: 100%;
}

.difficulty-selector {
  position: absolute;
  bottom: 0;
  right: 20%;
  transform: translateY(50%);
}
</style>