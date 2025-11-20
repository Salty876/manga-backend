import { Hono } from 'hono'
import { scraperPath } from "./routes/scraper"

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', scraperPath)

export default app
