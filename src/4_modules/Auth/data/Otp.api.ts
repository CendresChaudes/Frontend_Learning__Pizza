import {
  otpsControllerCreateOtpMutationKey,
  otpsControllerCreateOtpMutationOptions,
} from '~generated/tanstack/🔑 otpsService/useOtpsControllerCreateOtp';
import { queryClient } from '~core/api';

export class OtpApi {
  public async createOtp(phone: string): Promise<void> {
    const mutationOptions = otpsControllerCreateOtpMutationOptions();
    const { mutationFn } = mutationOptions;

    if (!mutationFn) {
      throw new Error('OTP mutation is not configured');
    }

    await mutationFn(
      { body: { phone } },
      {
        client: queryClient,
        meta: undefined,
        mutationKey: otpsControllerCreateOtpMutationKey(),
      },
    );
  }
}
