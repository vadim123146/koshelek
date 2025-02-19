<template>
  <main>
    <h1>Настройки</h1>
    <select class="sel" @change="onChange" aria-label="Select currency pair">
      <option value="btcusdt">BTCUSDT</option>
      <option value="bnbbtc">BNBBTC</option>
      <option value="ethbtc">ETHBTC</option>
    </select>
    <h2>Блог</h2>
    <ol>
      <li v-for="(item, index) in arr" :key="`setting-${index}`">
        В {{ item.time }} настройка валюты была изменена с {{ item.lastsost }} на {{ item.sost }}
      </li>
    </ol>
    <p>Сейчас активно значение - {{ $store.state.payload }}</p>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const sost = ref('');
const lastsost = ref('');
const arr = ref([]);
const time = ref('');

/**
 * Обработчик изменения значения в выпадающем списке.
 * @param {Event} event - Событие изменения значения.
 */
function onChange(event) {
  try {
    const currentTime = new Date().toTimeString();
    time.value = currentTime;

    sost.value = event.target.value;
    const previousSetting = arr.value.length > 0 ? arr.value[arr.value.length - 1].sost : '';
    lastsost.value = previousSetting;

    arr.value.push({ lastsost: lastsost.value, sost: sost.value, time: time.value });
    localStorage.setItem("settings", JSON.stringify(arr.value));

    store.commit('updatePayload', event.target.value);
    store.commit('openWebSocket');
  } catch (error) {
    console.error("Error updating settings:", error);
  }
}

/**
 * Инициализация данных из localStorage при монтировании компонента.
 */
onMounted(() => {
  const storedSettings = JSON.parse(localStorage.getItem("settings"));
  if (storedSettings) {
    arr.value = storedSettings;
  }
});
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

select {
  margin: auto;
  margin-bottom: 50px;
}

select:hover, select:focus {
  border-color: #ccc;
}
</style>
