type RickPick = {
  id: string;
  character: { id: string };
  user: { id: string };
};

class RicksPicksRepository {
  ricksPicks: RickPick[];

  constructor() {
    this.ricksPicks = [];
  }

  async findAll() {
    return this.ricksPicks;
  }

  async findAllByUserId(id: string) {
    return this.ricksPicks.filter((rickPick) => rickPick.user.id === id);
  }

  async findById(id: string) {
    return this.ricksPicks.find((rickPick) => rickPick.id === id);
  }

  async add(rickPick: Pick<RickPick, "character" | "user">) {
    const id = String(this.ricksPicks.length + 1);
    const newPickRick = { id, ...rickPick };
    this.ricksPicks.push(newPickRick);
    return newPickRick;
  }

  async remove(id: string) {
    this.ricksPicks = this.ricksPicks.filter((rickPick) => rickPick.id !== id);
  }

  async findByCharacterId(id: string) {
    return this.ricksPicks.filter((rickPick) => rickPick.character.id === id);
  }
}

export const ricksPicksRepository = new RicksPicksRepository();
