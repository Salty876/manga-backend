// The stuff here is for getting the stuff needed for a homepage

import { Hono } from "hono";
import { genre } from "../components/mangaInterfaces";

const home = new Hono();

home.get("/mangaList", async (c) => {
  const userAgent: string = "generic manga app (salty876 on github)";

  const response = await fetch("https://api.mangadex.dev/manga", {
    headers: {
      "User-Agent": userAgent,
    },
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  const data = await response.json();

  return c.json(data);
});

home.get("/genre", async (c) => {
  const userAgent: string = "generic manga app (salty876 on github)";

  const response = await fetch("https://api.mangadex.dev/manga/tag", {
    headers: {
      "User-Agent": userAgent,
    },
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  const data: any = await response.json();
  const tagList: any[] = data.data;
  const genreList: genre[] = [];

  //   Get tags that are exclusive to the title "genre"
  for (let i = 0; i < tagList.length; i++) {
    if (tagList[i].attributes.group === "genre") {
      const newGenre: genre = {
        name: tagList[i].attributes.name.en,
        genreID: tagList[i].id,
      };

      genreList.push(newGenre);
    }
  }

  return c.json({
    genres: genreList,
  });
});

export default home;
