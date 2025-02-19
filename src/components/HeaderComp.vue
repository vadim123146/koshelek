<template>
<div class="container">
<img class="container__img" src="@/assets/logo.png">
<ul>
    <li>
        <router-link to="/">Настройки</router-link>
    </li>
    <li>
        <router-link to="/order">Order Book</router-link>
    </li>
</ul>    
</div>  
</template>
<script setup>


</script>

<style scoped>
@import './css/normalize.css';
.container{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;   
    background: linear-gradient(90deg, rgba(0,0,0,0.9472163865546218) 0%, rgba(173,180,63,1) 0%, rgba(238,246,247,1) 100%);
	overflow-x:hidden;
   
}
.container__img{
    max-width: 7%;
}
ul{
    list-style-type: none;
    display: flex;
    flex-direction: row;
    width: 200px;
    align-items: center;
}
ul li{
    margin-right: 10px;
}
body{
    padding: 0;
    margin: 0;
}
</style>


