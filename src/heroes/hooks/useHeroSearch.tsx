import { useQuery } from "@tanstack/react-query"

import { searchHeroesAction, type OptionsSearch } from "../actions/search-heros.action"


export const useHeroSearch = ({
    category, name, status, strength, team, universe }:
    OptionsSearch) => {
    return useQuery({
        queryKey: ['search-hero', { category, name, status, strength, team, universe }],
        queryFn: () => searchHeroesAction(
            { name, strength, team, universe, status, category }),
        staleTime: 1000 * 60 * 5, //5 minutos
    })
}
