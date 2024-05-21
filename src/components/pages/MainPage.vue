<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import MovieCard from '../ui/MovieCard.vue'
import AppBar from '../ui/AppBar.vue'

const movieStore = useMovieStore()
const movies = ref(movieStore.movies)
const currentPage = ref(1)
const search = ref('')
const MOVIES_PER_PAGE = 25
const sortingParametrs = [
    { title: 'По названию', parametr: 'title' },
    { title: 'По году выхода', parametr: 'year' },
    { title: 'По средней оценке', parametr: 'score' },
    { title: 'По хронометражу', parametr: 'timing' },
]
const currentSorting = ref(movieStore.currentSorting)
const changePage = (page) => {
    currentPage.value = page
    window.scrollTo(0, 0)
}
const sorting = (sortParam, movies) => {
    switch (sortParam) {
        case 'title': {
            return movies.sort((m1, m2) =>
                m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1
            )
        }
        case 'year': {
            return movies.sort((m1, m2) => {
                if (m1.year > m2.year) {
                    return 1
                }
                else if (m1.year < m2.year) {
                    return -1
                }
                else {
                    return m1.name.toLowerCase() > m2.name.toLowerCase() ? 1: -1
                }
            })
        }
        case 'score': {
            return movies.sort((m1, m2) =>
                movieStore.countAverageScore(m1) > movieStore.countAverageScore(m2) ? 1 : -1
            )
        }
        case 'timing': {
            return movies.sort((m1, m2) =>
                m1.movieLength > m2.movieLength ? 1 : -1
            )
        }
    }
}
const searchMovies = computed(() => {
    if (search.value) {
        return movies.value.docs.filter((movie) =>
            movie.name.toLowerCase().includes(search.value.toLowerCase())
        )
    } else {
        return movies.value.docs
    }
})
const showMovies = computed(() => {
    const start = (currentPage.value - 1) * MOVIES_PER_PAGE
    const end = start + MOVIES_PER_PAGE
    if (!search.value) {
        const m = sorting(movieStore.currentSorting, movies.value.docs)
        return m.slice(start, end)
    } else {
        const m = sorting(movieStore.currentSorting, searchMovies.value)
        changePage(1)
        return m.slice(start, end)
    }
})
changePage(1)
</script>
<template>
    <v-app>
        <AppBar
            :sortingParametrs="sortingParametrs"
            :currentSorting="currentSorting"
        />
        <v-responsive
            class="mx-auto mt-4"
            width="500px"
            max-height="70px"
        >
            <v-text-field
                v-model="search"
                class="my-2"
                label="Поиск"
                variant="outlined"
                clearable
                prepend-inner-icon="mdi-magnify"
                rounded
            />
        </v-responsive>
        <v-container>
            <v-row
                v-if="showMovies.length > 0"
                justify="start"
                align="center"
            >
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
                        @click="
                            $router.push({
                                name: 'movieCard',
                                params: {
                                    movieId: movie.externalId._id,
                                },
                            })
                        "
                    />
                </v-col>
            </v-row>
            <v-alert
                v-else
                class="mx-auto mb-20"
                position="relative"
                rounded
                tonal
                max-width="450"
                min-width="250"
                title="Ничего не найдено"
                text="К сожалению, фильма с таким названием нет. Попробуйте поискать что-нибудь другое."
            />
        </v-container>
        <v-pagination
            v-model="currentPage"
            :length="searchMovies.length ? Math.ceil(searchMovies.length / MOVIES_PER_PAGE): 1"
            @update:modelValue="changePage"
        />
    </v-app>
</template>