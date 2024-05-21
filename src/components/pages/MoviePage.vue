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
        value:
            movie.value.rating.filmCritics > 0
                ? movie.value.rating.filmCritics
                : 'Рейтинг отсутствует',
    },
    {
        title: 'Рейтинг российских критиков: ',
        value:
            movie.value.rating.russianFilmCritics > 0
                ? movie.value.rating.russianFilmCritics
                : 'Рейтинг отсутствует',
    },
]
const rating = ref()
</script>

<template>
    <AppBar />
    <v-card
        class="my-5 mx-auto"
        :title="movie.name"
        :subtitle="movie.alternativeName"
        width="1000"
    >
        <v-container>
            <v-row
                justify="start"
                class="mb-5"
                no-gutters
            >
                <v-col cols="4">
                    <v-img
                        :src="movie.poster.url"
                        height="auto"
                        width="325px"
                        cover
                    />
                </v-col>
                <v-col>
                    <p class="mx-auto">О фильме:</p>
                    <v-list 
                        lines="one"
                        activatable="false"
                        selectable="false"
                    >
                        <v-list-item
                            link="false"
                            hover="false"
                            v-for="(item, i) in aboutMovie"
                            :key="i"
                            :title="item.title + item.value"
                            :value="item.value"
                        >
                        </v-list-item>
                    </v-list>
                    <v-container class="text-center">
                        <p>Оценка пользователя:</p>
                        <v-rating
                            v-model="rating"
                            hover
                            half-increments
                            length="10"
                            clearable
                            class="mb-0"
                        />
                        <pre v-if="rating > 0">{{ rating }}</pre>
                    </v-container>
                </v-col>
            </v-row>
            <strong>Описание:</strong>
            <p class="mx-auto">{{ movie.description }}</p>
        </v-container>
    </v-card>
</template>