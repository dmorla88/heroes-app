

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"

import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"

import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"




export const HomePage = () => {

    const [searchParams, setSearchParams] =
        useSearchParams()

    const activeTab = searchParams.get('tab') ?? 'all'
    const page = searchParams.get('page') ?? '1'
    const limit = searchParams.get('limit') ?? '6'
    const category = searchParams.get('category') ?? 'hero'

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'villains', 'heroes', 'favorites']
        return validTabs.includes(activeTab) ? activeTab : 'all'
    }, [activeTab]
    )

    //console.log(activeTab)

    const { favoriteCount, favorites } = use(FavoriteHeroContext)



    const { data: heroesResponse } =
        usePaginatedHero(+page, +limit, category)

    // console.log({ heroesResponse })

    const { data: summaryResponse } = useHeroSummary()

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron title="Universo de SuperHéroes"
                    description="Descubre, explora y administra super Héroes y Villanos">

                </CustomJumbotron>

                <CustomBreadcrumb currentPage="Super Heroes"></CustomBreadcrumb>

                {/* Stats Dashboard */}
                <HeroStats></HeroStats>

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger onClick={() => {
                            setSearchParams((searchParams) => {
                                searchParams.set("tab", "all");
                                searchParams.set("category", "all");
                                searchParams.set("page", "1");
                                return searchParams;
                            });
                        }}
                            value="all">All Characters ({summaryResponse?.totalHeroes})</TabsTrigger>
                        <TabsTrigger onClick={() => {
                            // setActiveTab("favorites")

                            setSearchParams((searchParams) => {
                                searchParams.set("tab", "favorites");
                                return searchParams;
                            });
                        }} value="favorites" className="flex items-center gap-2">

                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger onClick={() => {
                            //   setActiveTab("heroes")

                            setSearchParams((searchParams) => {
                                searchParams.set("tab", "heroes");
                                searchParams.set("category", "hero");
                                searchParams.set("page", "1");
                                return searchParams;
                            });
                        }} value="heroes">Heroes ({summaryResponse?.heroCount})</TabsTrigger>
                        <TabsTrigger onClick={() => {
                            // setActiveTab("villains")

                            setSearchParams((searchParams) => {
                                searchParams.set("tab", "villains");
                                searchParams.set("category", "villain");
                                searchParams.set("page", "1");
                                return searchParams;
                            });
                        }} value="villains">Villains ({summaryResponse?.villainCount})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <h1>Todos los personajes</h1>
                        {/* Character Grid */}

                        <HeroGrid heroes={heroesResponse?.heroes ?? []} ></HeroGrid>


                    </TabsContent>

                    <TabsContent value="favorites">
                        <h1>Favoritos</h1>
                        {/* Character Grid */}
                        <HeroGrid heroes={favorites} ></HeroGrid>
                    </TabsContent>
                    <TabsContent value="heroes">
                        <h1>Heroes</h1>
                        {/* Character Grid */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} ></HeroGrid>
                    </TabsContent>
                    <TabsContent value="villains">
                        <h1>Villanos</h1>
                        {/* Character Grid */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} ></HeroGrid>
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                {selectedTab !== 'favorites' && (
                    <CustomPagination totalPages={heroesResponse?.pages ?? 1}></CustomPagination>
                )
                }

            </>
        </ >
    )
}
