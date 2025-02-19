<template>
  <main>
    <h1>OrderBook</h1>
    <p>Выберите количество выводимых позиций</p>
    <select class="sel" @change="onChange" aria-label="Select number of positions">
      <option value="100">100</option>
      <option value="500">500</option>
      <option value="1000">1000</option>
    </select>

    <div class="wrapper">
      <div class="wrapperbids">
        <h2>Bids</h2>
        <table>
          <tbody>
            <tr class="th">
              <td>Price</td>
              <td class="hide">Quantity</td>
              <td>Total</td>
            </tr>
            <tr v-for="(item, index) in $store.state.bids" :key="`bid-${index}`">
              <td class="td">{{ item[0] }}</td>
              <td class="td hide">{{ item[1] }}</td>
              <td class="td">{{ item[0] * item[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="wrapperasks">
        <h2>Asks</h2>
        <table>
          <tbody>
            <tr class="th">
              <td>Price</td>
              <td class="hide">Quantity</td>
              <td>Total</td>
            </tr>
            <tr v-for="(item, index) in $store.state.asks" :key="`ask-${index}`">
              <td class="td">{{ item[0] }}</td>
              <td class="td hide">{{ item[1] }}</td>
              <td class="td">{{ item[0] * item[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const pos = ref('100');

    /**
     * Обработчик изменения значения в выпадающем списке.
     * @param {Event} event - Событие изменения значения.
     */
    const onChange = (event) => {
      try {
        pos.value = event.target.value;
        store.commit('changePositionLimit', event.target.value);
      } catch (error) {
        console.error("Error changing position limit:", error);
      }
    };

    return {
      onChange,
      pos
    };
  }
};
</script>

<style scoped>
main {
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

h1, h2 {
  margin: auto;
  color: brown;
  margin-bottom: 20px;
}

h2 {
  color: black;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 5%;
  width: 90%;
  margin: auto;
  max-height: 70vh;
}

.wrapperasks, .wrapperbids {
  overflow-y: scroll;
}

table {
  border-collapse: collapse;
  width: 40vw;
}

td {
  border: 1px brown solid;
  padding: 5%;
  word-break: break-all;
}

td:hover {
  background-color: #f0f0f0;
}

.th {
  position: sticky;
  top: 0px;
  word-break: normal !important;
}

select {
  margin-bottom: 7px;
  max-width: 15vw;
}

@media (max-width: 768px) {
  .hide {
    display: none;
  }
}
</style>
