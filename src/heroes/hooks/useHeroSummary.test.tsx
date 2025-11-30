import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getSummaryAction } from "../actions/get-summary.action";
import type { SummaryInformationResponse } from "../types/summary-information.response";


vi.mock('../actions/get-summary.action', () => ({
    getSummaryAction: vi.fn()
}))



const mockGetSummaryAction = vi.mocked(getSummaryAction)


const tanstackCustomProvider = () => {
    const queryClient = new QueryClient(
        {
            defaultOptions: {
                queries: {
                    retry: false
                }
            }
        }
    )
    return ({ children }: PropsWithChildren) => {
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    }
}


describe('useHeroSummary', () => {
    test('should return the initial state (islOading)', () => {

        const { result } = renderHook(() => useHeroSummary(),
            {
                wrapper: tanstackCustomProvider()
            })
        // expect(result.current.isLoading).toBe(true)
        // expect(result.current.isError).toBe(false)
        // expect(result.current.data).toBeUndefined

        // console.log(result.current)
    })

    test('should return success state with data when API call succeds', async () => {


        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Superman'
            },
            smartestHero: {
                id: '2',
                name: 'Batman'
            },
            heroCount: 18,
            villainCount: 7
        } as SummaryInformationResponse

        mockGetSummaryAction.mockResolvedValue(mockSummaryData)

        const { result } = renderHook(() => useHeroSummary(),
            {
                wrapper: tanstackCustomProvider()
            })
        await waitFor(() => {
            // expect(result.current.isSuccess).toBe(true)
            // console.log(result.current)
        })
        //  expect(result.current.isLoading).toBe(false)
        //  expect(mockGetSummaryAction).toHaveBeenCalled()
        //expect(result.current.isError).toBe(false)

    })

    test('should return error status when API call fail', async () => {
        const mockError = new Error('Failed to fetch summary')
        mockGetSummaryAction.mockRejectedValue(mockError)
        const { result } = renderHook(() => useHeroSummary(),
            {
                wrapper: tanstackCustomProvider()
            })

        await waitFor(() => {
            //  expect(result.current.isError).toBe(true)
            // console.log(result.current)
        })
        expect(result.current.error).toBeDefined()
        expect(result.current.isLoading).toBe(false)
        expect(mockGetSummaryAction).toHaveBeenCalled()
        expect(result.current.error?.message).toBe('Failed to fetch summary')
    })
})