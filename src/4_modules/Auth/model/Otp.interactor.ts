import type { OtpApi } from '../data/Otp.api';

export class OtpInteractor {
  private readonly _otpApi: OtpApi;

  constructor(otpApi: OtpApi) {
    this._otpApi = otpApi;
  }

  public async createOtp(phone: string): Promise<void> {
    await this._otpApi.createOtp(phone);
  }
}
