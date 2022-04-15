<template>
  <base-card v-if="transactions.length > 0" class="container center">
    <base-card v-for="txn in transactions" :key="txn.hash" class="txn">
      <div class="txn-data">
        From:
        <span
          >{{
            txn.from === null || txn.from === undefined
              ? "0x0000000000000000000000000000000000000000".slice(0, 9)
              : "0x" + String(txn.from).slice(0, 7)
          }}...</span
        >
      </div>
      <div class="txn-data">
        To: <span>0x{{ txn.to.slice(0, 10) }}...</span>
      </div>
      <div class="txn-data">
        Amount: <span>{{ String(txn.amount).slice(0, 4) }} ETH</span>
      </div>
    </base-card>
  </base-card>
  <base-card v-else class="container center">
    <base-card class="empty">
      There are no transactions in the first 2 blocks.</base-card
    >
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      transactions: [
        {
          from: "loading...",
          to: "loading...",
          amount: "loading...",
        },
        {
          from: "loading...",
          to: "loading...",
          amount: "loading...",
        },
        {
          from: "loading...",
          to: "loading...",
          amount: "loading...",
        },
        {
          from: "loading...",
          to: "loading...",
          amount: "loading...",
        },
      ],
    };
  },
  async created() {
    this.transactions = (
      await (
        await fetch(
          `https://hack-academy-block-server.herokuapp.com/block/${this.$route.params.id}/transactions`
        )
      ).json()
    ).transactions;
  },
};
</script>


<style scoped>
.container {
  width: 36rem;
  height: 24rem;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
}

.txn,
.empty {
  color: #9013fe;
  font-weight: 600;
  font-size: 1.2rem;
  text-shadow: 1px 1px black;
  background-color: #ffffff;
  border: 2px solid #9013fe;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.empty {
  font-size: 2rem;
  height: 8rem;
  justify-content: center;
}

span {
  color: black;
  font-weight: 400;
  text-shadow: none;
}

.txn-data {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: flex-start;
  height: calc(24rem / 8);
  padding-left: 1rem;
  width: calc(36rem / 3);
  overflow: hidden;
  text-overflow: ellipsis;
}

.txn-data:last-child {
  padding-right: 1rem;
  justify-content: space-between;
}
</style>