<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import { ref, computed } from 'vue'
import MovieCard from '../ui/MovieCard.vue'
import AppBar from '../ui/AppBar.vue'

const MovieStore = useMovieStore()

const movies = ref(MovieStore.movies)

const search = ref('')

const searchMovies = computed(() => {
    let m = movies.value.docs
    let searchVal = search.value.toLowerCase()
    if (searchVal){
        m = m.filter((movie) => {
            return movie.name.toLowerCase().indexOf(search.value.toLowerCase()) !== -1 
        })
    }
    return m
})
</script>

<template>
    <v-app>
        <AppBar/>
        <v-responsive class="mx-auto mt-8"
        width="500">
        <v-text-field
            label="Поиск"
            variant="outlined"
            clearable
            prepend-inner-icon="mdi-magnify"
            single-line
            v-model="search">
        </v-text-field>
    </v-responsive>
        <v-container>
            <v-row justify="start"
            align="center">
                <v-col 
                class="text-center"
                    v-for="movie in searchMovies">
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
