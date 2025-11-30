
import { AdminLayout } from "@/admin/layouts/AdminLayout"
import { AdminPage } from "@/admin/pages/AdminPage"
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout"
import { HeroPage } from "@/heroes/pages/hero/HeroPage"
import { HomePage } from "@/heroes/pages/home/HomePage"
//import { SearchPage } from "@/heroes/pages/search/SearchPage"
import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router"


const SearchPage = lazy(() =>
    import('@/heroes/pages/search/SearchPage')
)

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <HeroesLayout></HeroesLayout>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path: "heroes/:idSlug",
                element: <HeroPage></HeroPage>
            },
            {
                path: "search",
                element: <SearchPage></SearchPage>
            },
            {
                path: "*",
                element: <Navigate to={"/"}></Navigate>
            },


        ]
    },
    {
        path: "/admin",
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                index: true,
                element: <AdminPage></AdminPage>
            }
        ]
        //  element: <AdminPage></AdminPage>
    },


])