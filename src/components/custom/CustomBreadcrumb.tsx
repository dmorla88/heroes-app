import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SlashIcon } from "lucide-react"
import { Link } from "react-router"

interface Props {
    currentPage: string,
    breadcrumbs?: BreadcrumbInterface[]
}


interface BreadcrumbInterface {
    label: string,
    to: string

}

export const CustomBreadcrumb = ({ currentPage, breadcrumbs = [] }: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={"/"}>Inicio </Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>

                {
                    breadcrumbs.map((list) => {
                        return (<>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={list.to}>
                                        {list.label} </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                        </>)
                    })
                }

                <BreadcrumbItem>
                    <BreadcrumbPage className="text-black">{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
