import fetch from "node-fetch";
import { AppConfig } from "../../config/app";

type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: string;
};

type Characters = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
};

export class RickAndMortyApi {
  baseURL: string;

  constructor({ appConfig }: { appConfig: AppConfig }) {
    this.baseURL = appConfig.rickAndMortyApi;
  }

  async getAllCharacters(page?: number | null) {
    const response = await fetch(`${this.baseURL}/character/?page=${page || 1}`);
    const data = (await response.json()) as Characters;
    return {
      info: {
        count: data.info.count,
        pages: data.info.pages,
        next: data.info.next ? Number(data.info.next.split("=")[1]) : null,
        prev: data.info.prev ? Number(data.info.prev.split("=")[1]) : null,
      },
      results: data.results,
    };
  }

  async getCharacter(id: string) {
    const response = await fetch(`${this.baseURL}/character/${id}`);
    const data = (await response.json()) as Character;

    return data;
  }
}
