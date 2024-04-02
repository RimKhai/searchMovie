<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import { ref, computed } from 'vue'
import MovieCard from '../ui/MovieCard.vue'
import AppBar from '../ui/AppBar.vue'

const MovieStore = useMovieStore()

const movies = ref(MovieStore.movies)

const search = ref('')

const currentPage = ref(1)

const moviesPerPage = 25

const sorting = (sortParam, movies) => {
    switch (sortParam) {
        case 'title': {
            return movies.sort((m1, m2) =>
                m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1
            )
        }
        case 'year': {
            return movies.sort((m1, m2) => {
                if (m1.year > m2.year)
                    return 1
                else if (m1.year < m2.year)
                    return -1
                else 
                    return (m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1)
            })
        }
        case 'score': {
            return movies.sort((m1, m2) =>
                MovieStore.countAverageScore(m1) >
                MovieStore.countAverageScore(m2)
                    ? 1
                    : -1
            )
        }
        case 'timing': {
            return movies.sort((m1, m2) =>
                m1.movieLength > m2.movieLength ? 1 : -1
            )
        }
    }
}

var movieListPerPage = ref();

const showMovies = computed(() => {
    let m = movies.value.docs
    let searchVal = search.value
    if (searchVal != '' && searchVal != null) {
        m = m.filter((movie) => {
            return (movie.name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1)
        })
        movieListPerPage = sorting('year', m)
        return movieListPerPage
    }
    m = sorting('year', m)
    return m
})

const changePage = (page) => {
    console.log(page)
    let start = (page - 1) * moviesPerPage
    let end = start + moviesPerPage
    movieListPerPage = showMovies.value.slice(start, end)
    window.scrollTo(0, 0)
}

changePage(1)
</script>

<template>
    <v-app>
        <AppBar />
        <v-responsive
            class="mx-auto mt-8"
            width="500">
            <v-text-field
                label="Поиск"
                variant="outlined"
                clearable
                prepend-inner-icon="mdi-magnify"
                single-line
                v-model="search">
            </v-text-field>
            <div class="text-center">
                <v-btn
                class="mx-auto mb-3"
                variant="outlined"
                width="400"
                @click="changePage(currentPage)">
                    Поиск
                </v-btn>
            </div>
        </v-responsive>
        <v-container>
            <v-row
                justify="start"
                align="center">
                <v-col
                    class="text-center"
                    v-for="movie in movieListPerPage">
                    <MovieCard
                        :name="movie.name"
                        :score="MovieStore.countAverageScore(movie)"
                        :year="movie.year"
                        :poster="movie.poster.previewUrl" />
                </v-col>
            </v-row>
            <v-pagination
            v-model="currentPage"
            :length="MovieStore.totalPages()"
            @update:modelValue="changePage"
            />
        </v-container>
    </v-app>
    
</template>

<style>
</style>