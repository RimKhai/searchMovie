<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import MovieCard from '../ui/MovieCard.vue'
import AppBar from '../ui/AppBar.vue'
window.scrollTo(0, 0)
const movieStore = useMovieStore()
const currentPage = ref(1)
const MOVIES_PER_PAGE = 25
const changePage = (page) => {
    currentPage.value = page
    window.scrollTo(0, 0)
}
/* const movieLS = ref({})
const movies = movieStore.movies.docs */
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
    console.log(name)
    movieStore.changeDataAtLocalStorage(
        name,
        JSON.parse(localStorage.getItem(name)).rating,
        false
    )
}
//const markedMovies = computed(() => movieStore.getMarkedMovies)
const showMovies = computed(() => {
    const start = (currentPage.value - 1) * MOVIES_PER_PAGE
    const end = start + MOVIES_PER_PAGE
        const m = movieStore.sorting(movieStore.getMarkedMovies)
        //changePage(1)
        return m.slice(start, end)
})
/* const unmark = computed(() => {
    const movieLS = JSON.parse(localStorage.getItem(movie.name.toString()))
    movieLS.isMark = false
    localStorage.setItem(movie.name.toString(), JSON.stringify(movieLS))
    markedMovies
}) */
/* const watchChangingLS =  */ /* watch(
    () => [movieStore.getMarkedMovies],
    (movies, prevMovies) => {
        console.log(movies, prevMovies)
    },
    { deep: true }
) */
</script>

<template>
    <AppBar />
    <v-container>
        <v-row justify="start">
            <v-col
                class="text-center"
                v-for="movie in showMovies"
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
    <v-pagination
        v-model="currentPage"
        :length="
            movieStore.getMarkedMovies.length
                ? Math.ceil(movieStore.getMarkedMovies.length / MOVIES_PER_PAGE)
                : 1
        "
        @update:modelValue="changePage"
    />
</template>

<style lang="scss" scoped></style>
