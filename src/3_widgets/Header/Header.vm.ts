import { computed, makeObservable } from 'mobx';
import { CAppRouting } from '~core/config';

export class HeaderViewModel {
  @computed
  public get title(): string {
    if (CAppRouting.AUTH.isOpened) {
      return 'Авторизация';
    }

    return 'Неизвестная страница';
  }

  constructor() {
    makeObservable(this, undefined, {
      autoBind: true,
    });
  }
}
