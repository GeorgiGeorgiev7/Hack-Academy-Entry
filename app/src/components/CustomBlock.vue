<template>
  <base-card class="block">
    <h2>Block Height: {{ blockHeight }}</h2>
    <hr />
    <div class="stats">
      <div class="stats-stat"><span>Timestamp:</span> {{ timestamp }}</div>
      <div class="stats-stat"><span>Data:</span></div>
      <textarea
        :value="data ? data : input"
        @blur="$emit('data', input)"
        name="data"
        id="data"
        rows="7"
      ></textarea>
      <div class="stats-stat"><span>Nonce:</span> {{ nonce }}</div>
      <div class="stats-stat">
        <span>Previous Hash:</span> {{ previousHash }}
      </div>
      <div class="stats-stat"><span>Hash:</span> {{ hash }}</div>
    </div>
    <slot />
  </base-card>
</template>

<script>
export default {
  emits: ["data"],
  props: {
    blockHeight: {
      type: Number,
      required: true,
    },
    data: {
      type: Number,
      required: false,
    },
    timestamp: {
      type: String,
      required: true,
    },
    nonce: {
      type: Number,
      required: true,
    },
    previousHash: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style scoped>
.block {
  height: 20rem;
  width: 20rem;
  padding-bottom: 1rem;
}

h2 {
  margin: 0;
  font-size: 2.5em;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

hr {
  margin: 0;
  height: 2px;
  background-color: #9013fe;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  border: 0;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: calc(80% - 2px);
  font-size: 1.4em;
}

.stats-stat {
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

#data {
  min-height: 5em;
  max-height: 7.5em;
  min-width: 50%;
  max-width: 60%;
  margin: -4% 0;
  border: 1px solid #9013fe;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 0.5rem;
  overflow: auto;
  cursor: default;
}

#data:focus {
  outline: 1px solid #9013fe;
}

span {
  font-weight: 600;
}
</style>