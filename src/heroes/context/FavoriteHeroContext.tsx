import { createContext, useEffect, useState, type PropsWithChildren } from "react"
import type { Hero } from "../types/hero.interface"


interface FavoriteHeroContext {

    //state
    favorites: Hero[]
    favoriteCount: number

    //Methods
    toogleFavorite: (hero: Hero) => void
    isFavorite: (hero: Hero) => boolean
}

export const FavoriteHeroContext = createContext
    <FavoriteHeroContext>({} as FavoriteHeroContext)


const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorite')
    return favorites ? JSON.parse(favorites) : []
}

export const FavoriteHeroProvider =
    ({ children }: PropsWithChildren) => {

        const [favorites, setFavorites] =
            useState<Hero[]>(getFavoritesFromLocalStorage)

        const toogleFavorite = (hero: Hero) => {
            const heroExist = favorites.find(h =>
                h.id === hero.id)

            if (heroExist) {
                const newFavorites = favorites.filter(h =>
                    h.id !== hero.id)
                setFavorites(newFavorites)
                return
            }

            setFavorites([...favorites, hero])
        }

        useEffect(() => {
            localStorage.setItem('favorite',
                JSON.stringify(favorites))
        }, [favorites])



        return (
            <FavoriteHeroContext
                value={{
                    favoriteCount: favorites.length,
                    favorites: favorites,
                    isFavorite: (hero: Hero) =>
                        favorites.some((h) => h.id === hero.id),
                    toogleFavorite: toogleFavorite
                }}>
                {children}
            </FavoriteHeroContext >
        )
    }
