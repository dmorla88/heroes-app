import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useHeroSearch } from "@/heroes/hooks/useHeroSearch"
import { useSearchParams } from "react-router"




export const SearchPage = () => {

    const [searchParams] = useSearchParams()

    const name = searchParams.get('name') ?? ''
    const strength = searchParams.get('strength') ?? ''



    const { data: searchHeroResponse = [] } =
        useHeroSearch({ name, strength })


    return (
        <>
            <CustomJumbotron title="Búsqueda de SuperHéroes"
                description="Descubre, explora y administra super Héroes y Villanos">

            </CustomJumbotron>

            <CustomBreadcrumb currentPage="Buscador de Heroes"

            ></CustomBreadcrumb>

            {/* Stats Dashboard */}
            <HeroStats></HeroStats>

            {/* Controls */}
            <SearchControls></SearchControls>

            <HeroGrid heroes={searchHeroResponse}></HeroGrid>
        </>
    )
}

export default SearchPage