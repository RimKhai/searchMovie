<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppBar from '../ui/AppBar.vue'
const movieStore = useMovieStore()
const route = useRoute()
const movieId = computed(() => route.params.movieId)
const movie = computed(() => movieStore.findMovieById(movieId.value))
const aboutMovie = [
    {
        title: 'Год производства: ',
        value: movie.value.year,
    },
    {
        title: 'Длительность: ',
        value: movie.value.movieLength + ' минут',
    },
    {
        title: 'Оценка на КиноПоиске: ',
        value: movie.value.rating.kp,
    },
    {
        title: 'Оценка на IMDb: ',
        value: movie.value.rating.imdb,
    },
    {
        title: 'Рейтинг критиков: ',
        value: movie.value.rating.filmCritics,
    },
    {
        title: 'Рейтинг российских критиков: ',
        value: movie.value.rating.russianFilmCritics,
    },
]
</script>

<template>
    <AppBar />
    <v-card
        class="mx-auto"
        :title="movie.name"
        :subtitle="movie.alternativeName"
    >
        <v-img
            :src="movie.poster.url"
            height="auto"
            width="300px"
            cover
        />
        <!-- <h1>
            {{ movie.name }}
        </h1>
        <h2 v-if="movie.alternativeName">
            Оригинальное название:
            {{ movie.alternativeName }}
        </h2> -->
        <p class="mx-auto">О фильме</p>
        <v-list>
            <v-list-item
                v-for="(item, i) in aboutMovie"
                :key="i"
                :title="item.title + item.value"
                :value="item.value"
            >
            </v-list-item>
        </v-list>
        <p>Описание:</p>
        <p class="mx-auto">{{ movie.description }}</p>
    </v-card>
</template>

<style lang="scss" scoped></style>
