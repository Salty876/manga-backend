

export function getMangaCode(url: string): string{

    const codeArray:string[] = url.split('/')

    return codeArray[codeArray.length - 1]
}