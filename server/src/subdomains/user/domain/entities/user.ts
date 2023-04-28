import { Entity } from 'src/shared/entities/entity';

export class User extends Entity {
  #username: string;

  constructor(id: string, created: Date, updated: Date, username: string) {
    super(id, created, updated);

    this.#username = username;
  }

  //*** GETTERS ***//

  get username(): string {
    return this.#username;
  }
}
