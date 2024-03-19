import { defineStore } from 'pinia'
import kinopoisk from '../../BD/kinopoisk-1.json'

export const useMovieStore = defineStore ('MovieStore', {
    state: () => ({
        movies: kinopoisk,
    }),
    
    actions: {
        countAverageScore(movie){
            let sum = 0;
            let count = 0;
            if (movie.rating.kp > 0){
                sum += movie.rating.kp;
                count += 1;
            }
            if (movie.rating.imdb > 0){
                sum += movie.rating.imdb;
                count += 1;
            }
            if (movie.rating.filmCritics > 0){
                sum += movie.rating.filmCritics;
                count += 1;
            }
            if (movie.rating.russianFilmCritics > 0){
                sum += movie.rating.russianFilmCritics / 10;
                count += 1;
            }
            if (movie.rating.await > 0){
                sum += movie.rating.await / 10;
                count += 1;
            }

            return (Math.round(sum/count * 1000) / 1000)
        }
    }
})