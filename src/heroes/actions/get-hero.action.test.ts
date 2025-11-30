import { describe, expect, test } from "vitest"
import { getHeroAction } from "./get-hero.action"


describe('getHeroAction', () => {

    test('should fetch data and return with complete image url',
        async () => {

            const name = 'bruce-wayne'

            const result = await getHeroAction(name)
            expect(result.slug).toBe(name)
            expect(result.image).toContain('http')
        })


    test('should throw and error if hero is not found',
        async () => {

            const name = '-wayne'

            const result = await getHeroAction(name).
                catch((error) => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe
                        ('Request failed with status code 404')
                })
            expect(result).toBeUndefined()
        })
})