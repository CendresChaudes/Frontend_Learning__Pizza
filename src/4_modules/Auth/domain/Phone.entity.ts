export class Phone {
  constructor(private readonly _value: string) {
    if (!_value.startsWith('+7')) {
      throw new Error('Телефон должен начинаться с +7');
    }
  }

  public get value(): string {
    return this._value;
  }
}
