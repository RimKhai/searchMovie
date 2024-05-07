<script setup>
import { useMovieStore } from '../../stores/MovieStore.js'
const props = defineProps(['sortingParametrs'], 'currentSorting')
const MovieStore = useMovieStore()

const sortHandler = (param) => {
    MovieStore.currentSorting = param
}

const isActive = (currentItem) => {
    if (currentItem === MovieStore.currentSorting) return 'green'
    else return false
}
</script>

<template>
    <v-toolbar
        density="default"
        scroll-behavior="hide"
    >
        <v-toolbar-title>ПоискКино</v-toolbar-title>
        <!-- <v-spacer /> -->
        <!-- <v-select
        :items="sortingParametrs"
        v-model="sorting"
        label="Сортировка"
        >
        </v-select> -->
        <v-btn v-if="$route.path === '/'">
            Сортировка
            <v-menu activator="parent">
                <v-list>
                    <v-list-item
                        color="green"
                        v-for="(item, index) in sortingParametrs"
                        :key="index"
                        :value="item.parametr"
                        @click="sortHandler(item.parametr)"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
    </v-toolbar>
</template>

<style lang="scss" scoped></style>
