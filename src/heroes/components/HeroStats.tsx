import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import { HeroStatCard } from "./HeroStatCard"
import { useHeroSummary } from "../hooks/useHeroSummary"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"
import { use } from "react"


export const HeroStats = () => {

    const { data: summaryResponse } = useHeroSummary()

    const { favoriteCount } = use(FavoriteHeroContext)

    const percentFavorites = (favoriteCount * 100 / (summaryResponse?.totalHeroes ?? 0)).toFixed(2)
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">


            <HeroStatCard title="Total de Personajes"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}>
                <div className="text-2xl font-bold">{summaryResponse?.totalHeroes}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summaryResponse?.heroCount} Heroes
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summaryResponse?.villainCount}  Villains
                    </Badge>
                </div>

            </HeroStatCard>
            {/* Pendiente */}
            <HeroStatCard title="Favoritos"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}>
                <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
                <p className="text-xs text-muted-foreground">{percentFavorites}% of total</p>

            </HeroStatCard>

            <HeroStatCard title="Fuerte"
                icon={<Zap className="h-4 w-4 text-muted-foreground" />}>
                <div className="text-lg font-bold">{summaryResponse?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Strength: {summaryResponse?.strongestHero.strength}/10</p>

            </HeroStatCard>

            <HeroStatCard title="Inteligente"
                icon={<Trophy className="h-4 w-4 text-muted-foreground" />}>
                <div className="text-lg font-bold">{summaryResponse?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Intelligence: {summaryResponse?.smartestHero.intelligence}/10</p>

            </HeroStatCard>

            {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <p className="text-xs text-muted-foreground">18.8% of total</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Strongest</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-lg font-bold">Superman</div>
                    <p className="text-xs text-muted-foreground">Strength: 10/10</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Smartest</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-lg font-bold">Batman</div>
                    <p className="text-xs text-muted-foreground">Intelligence: 10/10</p>
                </CardContent>
            </Card> */}
        </div>
    )
}
