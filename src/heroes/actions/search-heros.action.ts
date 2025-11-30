import { heroApi } from "../api/hero.api"
import type { Hero } from "../types/hero.interface"

export interface OptionsSearch {
    name?: string,
    team?: string
    universe?: string
    status?: string
    category?: string
    strength?: string
}

const BASE_URL = import.meta.env.VITE_API_URL

export const searchHeroesAction = async (
    { name, strength, team, universe, status, category }: OptionsSearch
): Promise<Hero[]> => {

    if (!name && !strength && !team && !universe && !status
        && !category)
        return []

    const { data } = await heroApi.get<Hero[]>('/search', {
        params: {
            name,
            strength,
            team,
            universe,
            status,
            category
        }
    })




    return data.map(hero => (
        {
            ...hero,
            image: `${BASE_URL}/images/${hero.image}`
        }
    ))


}