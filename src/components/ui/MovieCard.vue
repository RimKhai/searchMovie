<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'

const movie = defineProps(['name', 'score', 'year', 'poster'])
const MovieStore = useMovieStore()
</script>

<template>
        <v-card
            height="400px"
            max-width="200px"
            hover
            link>
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
</template>

<style lang="scss" scoped></style>
