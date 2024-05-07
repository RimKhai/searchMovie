<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppBar from '../ui/AppBar.vue'
const movieStore = useMovieStore()
const route = useRoute()
const movieId = computed(() => route.params.movieId)
const movie =  movieStore.findMovieById(movieId.value)
/* console.log(movieStore.findMovieById(movieId)) */
</script>

<template>
    <AppBar />
    <h1>
        {{ movie.name }}
    </h1>
    <h2 v-if="movie.alternativeName">
        Оригинальное название:
        {{ movie.alternativeName }}
    </h2>
</template>

<style lang="scss" scoped></style>
