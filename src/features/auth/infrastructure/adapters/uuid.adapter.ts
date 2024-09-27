import { v4, validate, version } from "uuid";

export class UUIDAdapter {
  static generate() {
    return v4();
  }

  static validate(uuid: string) {
    return validate(uuid) && version(uuid) === 4;
  }
}
