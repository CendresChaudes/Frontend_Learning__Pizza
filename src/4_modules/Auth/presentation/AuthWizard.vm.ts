import { action, computed, makeObservable, observable } from 'mobx';
import type { IPhone } from '../domain/Phone.interface';
import { OtpInteractor } from '../model/Otp.interactor';

export class AuthWizardViewModel {
  @observable
  public phone: IPhone['phone'] = '';

  private readonly _abortController = new AbortController();
  private readonly _otpInteractor: OtpInteractor;

  @computed
  public get isCreateOtpPending(): boolean {
    return this._otpInteractor.createOtpMutation.isPending;
  }

  constructor() {
    makeObservable(this, undefined, {
      autoBind: true,
    });

    this._otpInteractor = new OtpInteractor(this._abortController.signal);
  }

  @action
  public setPhone(phone: IPhone['phone']) {
    this.phone = phone;
  }

  @action
  public async createOtp() {
    if (!this.phone) {
      throw new Error('Номер телефона не установлен');
    }

    await this._otpInteractor.createOtp(this.phone);
    this.setPhone('');
  }

  public destroy() {
    console.log('AuthWizardViewModel destroyed');
  }
}
