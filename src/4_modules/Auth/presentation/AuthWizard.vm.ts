import { zodResolver } from '@hookform/resolvers/zod';
import { computed, makeObservable } from 'mobx';
import { createForm, type Form } from 'mobx-react-hook-form';
import { OtpInteractor } from '../model/Otp.interactor';
import { phoneSchema, type TPhoneFormValues } from '../model/Phone.schema';

export class AuthWizardViewModel {
  public readonly form: Form<TPhoneFormValues, undefined, TPhoneFormValues>;

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

    this.form = createForm<TPhoneFormValues, undefined, TPhoneFormValues>({
      abortSignal: this._abortController.signal,
      defaultValues: { phone: '' },
      resolver: zodResolver(phoneSchema),
      onSubmit: async ({ phone }) => {
        await this._otpInteractor.createOtp(phone);
        this.form.resetForm();
      },
    });
  }

  public destroy() {
    this.form.destroy();
    this._abortController.abort();
  }
}
