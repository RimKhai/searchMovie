<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import { ref, computed} from 'vue'
import MovieCard from '../ui/MovieCard.vue'
import AppBar from '../ui/AppBar.vue'

const MovieStore = useMovieStore()

const movies = ref(MovieStore.movies)

const currentPage = ref(1)

const moviesPerPage = 25

const sortingParametrs = [
    {title: "По названию", parametr: "title"},
    {title: "По году выхода", parametr: "year"},
    {title: "По средней оценке", parametr: "score"},
    {title: "По хронометражу", parametr: "timing"},
]

const currentSorting = ref(MovieStore.currentSorting)

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

const movieListPerPage = ref([])

const showMovies = computed(() => {
    let start = (currentPage.value - 1) * moviesPerPage
    let end = start + moviesPerPage
    let m = movies.value.docs
    m = sorting(MovieStore.currentSorting, m)
    /* movieListPerPage = m.slice(start, end) */
    return m.slice(start, end)
})

const changePage = (page) => {
    currentPage.value = page
    window.scrollTo(0, 0)
}

changePage(1)
</script>

<template>
    <v-app>
        <AppBar :sortingParametrs="sortingParametrs" :currentSorting="currentSorting"/>
        <v-responsive
            class="mx-auto mt-8"
            width="500">
            <v-col cols="12">
            <v-autocomplete
                label="Поиск"
                variant="outlined"
                auto-select-first
                :items="MovieStore.movies.docs"
                item-title="name"
                no-data-text="Ничего не найдено("
                item-props
                clearable
                prepend-inner-icon="mdi-magnify"
                single-line
                menu-icon=""
                rounded>
            </v-autocomplete>
            </v-col>
            <!-- <div class="text-center">
                <v-btn
                rounded
                class="mx-auto mb-3"
                variant="outlined"
                width="400"
                >
                    Поиск
                </v-btn>
            </div> -->
        </v-responsive>
        <v-container>
            <v-row
                justify="start"
                align="center">
                <v-col
                    class="text-center"
                    v-for="movie in showMovies">
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