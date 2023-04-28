export abstract class Entity {
  #id: string;
  #created: Date;
  #updated: Date;

  constructor(id: string, created: Date, updated: Date) {
    this.#id = id;
    this.#created = created;
    this.#updated = updated;
  }

  //*** GETTERS ***//

  get id(): string {
    return this.#id;
  }

  get created(): Date {
    return this.#created;
  }

  get updated(): Date {
    return this.#updated;
  }
}
