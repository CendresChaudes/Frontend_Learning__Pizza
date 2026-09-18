import { otpsControllerCreateOtp } from '~generated/http/🔑 otpsService/otpsControllerCreateOtp';

export class OtpApi {
  public async createOtp(phone: string): Promise<void> {
    await otpsControllerCreateOtp({
      body: {
        phone,
      },
    });
  }
}
