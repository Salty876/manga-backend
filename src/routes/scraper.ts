import { Hono } from 'hono'
import { getGenres } from "../lib/scraper/homePage"

export const scraperPath = new Hono()

scraperPath.get('/genre', async (c) => {
    const genreList: string[] = await getGenres()
    console.log(genreList) 
    console.log("works")
  return c.json(genreList)
})

export default scraperPath