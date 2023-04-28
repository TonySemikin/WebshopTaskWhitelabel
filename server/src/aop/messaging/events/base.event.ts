import { v4 as uuid } from 'uuid';

export abstract class BaseEvent {
  constructor(public name: string, public payload: any, public id = uuid()) {}
}
