export class Address {
  #shortDescription: string;

  constructor(shortDescription: string) {
    this.#shortDescription = shortDescription;
  }

  //*** GETTERS ***//

  get shortDescription(): string {
    return this.#shortDescription;
  }
}
