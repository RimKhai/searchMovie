<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'

const movie = defineProps(['name', 'score', 'year', 'poster'])
const MovieStore = useMovieStore()
</script>

<template>
    <div class="d-flex align-center flex-column">
        <v-card
            class="my-2 align-end"
            height="400px"
            max-width="200px"
            hover>
            <v-img 
            height="300px"
            :src="poster"
            cover/>
            <v-card-title>
                {{ name }}
            </v-card-title>
            <v-card-subtitle>
                <p>{{ "Средняя оценка: " + score }}</p>
                <p>{{ year + " года выпуска"}}</p>
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<style lang="scss" scoped></style>
