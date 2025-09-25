export class ConfigItem {
  constructor(
    public key: string,
    public value: string,
    public type: string,
    public description: string = ""
  ) {}
}
