<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import MovieCard from '../ui/MovieCard.vue'

const MovieStore = useMovieStore()
</script>

<template>
    <v-app>
        <v-container fluid>
            <v-row dense>
                <v-col
                    class="text-center center"
                    v-for="movie in MovieStore.movies.docs">
                    <MovieCard
                        :name="movie.name"
                        :score="MovieStore.countAverageScore(movie)"
                        :year="movie.year"
                        :poster="movie.poster.previewUrl" />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<style lang="scss" scoped></style>
