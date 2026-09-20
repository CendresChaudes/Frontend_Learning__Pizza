import { Mutation } from 'mobx-tanstack-query';
import { queryClient } from '~core/api';
import { HttpClient } from '~shared/api';
import type { IPhone } from '../domain/Phone.interface';

export class OtpApi {
  public readonly createOtpMutation: Mutation<void, IPhone>;

  constructor(abortSignal: AbortSignal) {
    this.createOtpMutation = new Mutation({
      queryClient,
      abortSignal,
      mutationKey: ['otp'],
      mutationFn: async (phone: IPhone, { signal }) => {
        await HttpClient.post('/otps/otp', phone, { signal });
      },
    });
  }

  public async createOtp(phone: IPhone): Promise<void> {
    await this.createOtpMutation.mutate(phone);
  }
}
