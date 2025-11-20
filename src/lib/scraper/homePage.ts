import axios from 'axios'
import * as cheerio from 'cheerio'

const baseURL:string = "https://mangapark.io/"

export async function getGenres(): Promise<string[]> {
    const genreList: string[] = []
        try{
            
            const response = await axios.get(baseURL, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
            const htmlContent = cheerio.load(response.data)
            
            htmlContent('span.whitespace-nowrap').each((index, element) => {

                console.log(htmlContent(element).text().trim())
                if (!htmlContent(element).text().includes("ago") && !genreList.includes(htmlContent(element).text())){

                    genreList.push(htmlContent(element).text().trim())

                }
            })



        }catch(error)
        {
            console.error("Error fetching and parsing genres: ", error)
        }
        
        console.log(genreList)
        return genreList
}
