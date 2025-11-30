import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import { FavoriteHeroProvider } from "./FavoriteHeroContext";

describe('FavoriteHeroContext', () => {
    test('should initilaze with default values', () => {

        render(<FavoriteHeroProvider></FavoriteHeroProvider>)

    })
})