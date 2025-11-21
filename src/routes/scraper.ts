import { Hono } from 'hono'
import { getGenres, getLatest } from "../lib/scraper/homePage"
import { mangaCard } from '../components/mangaInterfaces'

export const scraperPath = new Hono()

scraperPath.get('/genre', async (c) => {
    const genreList: string[] = await getGenres()
    console.log(genreList) 
    console.log("works")
  return c.json(genreList)
})


scraperPath.get('/latest', async (c) => {
  const latestList: mangaCard[] = await getLatest()
  return c.json(latestList)
})


export default scraperPath