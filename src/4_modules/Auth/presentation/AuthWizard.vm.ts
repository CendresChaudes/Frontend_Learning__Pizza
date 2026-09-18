import { action, makeObservable, observable } from 'mobx';
import { OtpApi } from '../data/Otp.api';
import { Phone } from '../domain/Phone.entity';
import { OtpInteractor } from '../model/Otp.interactor';

export class AuthWizardViewModel {
  @observable public phone = '';
  private readonly _otpInteractor: OtpInteractor;

  constructor() {
    makeObservable(this, undefined, {
      autoBind: true,
    });

    const otpApi = new OtpApi();
    this._otpInteractor = new OtpInteractor(otpApi);
  }

  @action
  public setPhone(phone: string) {
    this.phone = phone;
  }

  @action
  public async createOtp() {
    if (!this.phone) {
      throw new Error('Номер телефона не установлен');
    }

    const phone = new Phone(this.phone);
    await this._otpInteractor.createOtp(phone.value);
    this.setPhone('');
  }

  public destroy() {
    console.log('AuthWizardViewModel destroyed');
  }
}
