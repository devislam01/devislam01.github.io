<script setup>
import TopNavigation from '../TopNavigation.vue';

</script>

<template>
    <div class="frontend-layout">
        <TopNavigation></TopNavigation>
        <div class="container">
            <main class="content">
                <RouterView></RouterView>
            </main>
        </div>
    </div>
</template>

<style scoped>
.container{
    margin: 20px;
}
</style>
