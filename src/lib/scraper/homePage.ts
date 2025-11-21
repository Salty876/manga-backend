import axios from 'axios'
import * as cheerio from 'cheerio'
import { mangaCard } from '../../components/mangaInterfaces'
import { getMangaCode } from '../helperWorkers'

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
            
            htmlContent('span[q\\:key="HB_8"]').each((index, element) => {

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



export async function getLatest(): Promise<mangaCard[]>{
    const latestManga: mangaCard[] = []
    

    try {
        const response = await axios.get(baseURL + "latest", {
            headers: {
                    'Access-Control-Allow-Origin': '*'
                }
        })
        
        const $ = cheerio.load(response.data)

        // get each manga card
        $('div.flex border-b border-b-base-200 pb-3').each((index, element) => {


            const $element = $(element)

            // Get the manga code and parse/clean it

            const uncleanCode:string = $element.find('h3.font-bold space-x-1').text()
            const cleanCode:string = getMangaCode(uncleanCode)
            console.log(uncleanCode)

            // Get the image url
            const posterUrl:string = $element.find('img[q\\:key="q1_1"]').text()

            // Get the title
            const title:string = $element.find('a[q\\:key="o2_2"]').text()

            // Get the tags
            const tags:string[] = []

            $element.find('div[q\\:key="kd_0"]').each((subIndex, subEelement) => {
                tags.push($(subEelement).text())
            })

            const mangaCard: mangaCard = {
                mangaID: cleanCode,
                title: title,
                cover: posterUrl,
                tags: tags
            }

            latestManga.push(mangaCard)


    })
        }catch(error)
    {
        console.error("Error fetching parsing HTML for latest manga", error)
    }

    return latestManga;

}