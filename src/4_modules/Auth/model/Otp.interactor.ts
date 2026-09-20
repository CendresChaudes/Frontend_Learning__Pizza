import type { Mutation } from 'mobx-tanstack-query';
import { OtpApi } from '../data/Otp.api';
import type { IPhone } from '../domain/Phone.interface';

export class OtpInteractor {
  public readonly _otpApi: OtpApi;

  public get createOtpMutation(): Mutation<void, IPhone> {
    return this._otpApi.createOtpMutation;
  }

  constructor(abortSignal: AbortSignal) {
    this._otpApi = new OtpApi(abortSignal);
  }

  public async createOtp(phone: IPhone['phone']): Promise<void> {
    await this._otpApi.createOtp({ phone });
  }
}
