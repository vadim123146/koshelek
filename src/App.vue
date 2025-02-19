<template>
  <div class="app-container">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/HeaderComp.vue';
import Footer from './components/FooterComp.vue';

export default {
  name: 'App', // Имя компонента для лучшей идентификации
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 20px;
}

/* Добавьте стили для Header и Footer, если это необходимо */
header, footer {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
}
</style>





