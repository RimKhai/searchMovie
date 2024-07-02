<script setup>
const emit = defineEmits(['unmarkMovie'])
const movie = defineProps(['name', 'score', 'year', 'poster', 'id'])
/* function unmarkMovie() {
    //сделать emit
    const movieLS = JSON.parse(localStorage.getItem(movie.name.toString()))
    movieLS.isMark = false
    localStorage.setItem(movie.name.toString(), JSON.stringify(movieLS))
} */
</script>

<template>
    <v-card
        class="ma-1 pa-1"
        :height="$route.path === '/markers' ? '475px' : '450px'"
        max-width="200px"
        hover
        ><!-- :height="$route.path === '/markers' ? '500px' : '400px'" -->
        <v-btn
            v-if="$route.path === '/markers'"
            class="mx-auto"
            variant="text"
            density="compact"
            icon="mdi-bookmark-remove-outline"
            @click="$emit('unmarkMovie', movie.name)"
        /><!-- @click="unmarkMovie()" -->
        <v-img
            height="300px"
            :src="poster"
            cover
        />
        <v-card-title>
            {{ name }}
        </v-card-title>
        <v-card-subtitle>
            <p>{{ 'Средняя оценка: ' + score }}</p>
            <p>{{ year + ' года выпуска' }}</p>
        </v-card-subtitle>
        <v-btn
            text="Узнать больше..."
            density="compact"
            class="mt-3"
            @click="
                $router.push({
                    name: 'movieCard',
                    params: {
                        movieId: movie.id,
                    },
                })
            "
        />
    </v-card>
</template>

<style lang="scss" scoped></style>
