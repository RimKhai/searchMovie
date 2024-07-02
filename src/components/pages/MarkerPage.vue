<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import MovieCard from '../ui/MovieCard.vue'
import AppBar from '../ui/AppBar.vue'
window.scrollTo(0, 0)
const movieStore = useMovieStore()
const movieLS = ref({})
const movies = movieStore.movies.docs
/* const markedMovies = computed(() =>
    movies.filter((movie) => {
        movieLS.value = JSON.parse(localStorage.getItem(movie.name))
        if (movieLS.value && movieLS.value.isMark) {
            console.log(movie.name)
            console.log(movieLS.value)
            return true
        } else {
            return false
        }
    })
) */
function unmark(name) {
    //const movieLS = JSON.parse(localStorage.getItem(name))
    movieStore.changeDataAtLocalStorage(
        name,
        JSON.parse(localStorage.getItem(name)).rating,
        false,
    )
}
const markedMovies = computed(() => movieStore.getMarkedMovies)
/* const unmark = computed(() => {
    const movieLS = JSON.parse(localStorage.getItem(movie.name.toString()))
    movieLS.isMark = false
    localStorage.setItem(movie.name.toString(), JSON.stringify(movieLS))
    markedMovies
}) */
</script>

<template>
    <AppBar />
    <v-container>
        <v-row justify="start">
            <v-col
                class="text-center"
                v-for="movie in markedMovies"
                :key="movie.name"
            >
                <MovieCard
                    :name="movie.name"
                    :score="movieStore.countAverageScore(movie)"
                    :year="movie.year"
                    :poster="movie.poster.previewUrl"
                    :id="movie.externalId._id"
                    @unmark-movie="unmark(movie.name)"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>
