import { Controller } from 'mobx-react-hook-form';
import { observer } from 'mobx-react-lite';
import { preventInputEnterKeyDown, useViewModel } from '~shared/lib';
import { Button, Input } from '~shared/ui';
import { EField } from '../model/Phone.schema';
import { AuthWizardViewModel } from './AuthWizard.vm';
import styles from './CreateOtpForm.component.m.css';

function CreateOtpFormComponent(): ReactJSX {
  const viewModel = useViewModel(() => new AuthWizardViewModel());
  const { form } = viewModel;
  const phoneError = form.errors.phone?.message;

  const handleSubmit = async () => {
    try {
      await form.submit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.root}>
      <p className={styles.intro}>Введите номер телефона для входа в свой профиль</p>

      <label className={styles.field}>
        <Controller
          name={EField.PHONE}
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7XXXXXXXXXX"
              onKeyDown={preventInputEnterKeyDown}
            />
          )}
        />

        {phoneError && <span className={styles.error}>{phoneError}</span>}
      </label>

      <Button
        type="button"
        disabled={viewModel.isCreateOtpPending}
        onClick={handleSubmit}
      >
        {viewModel.isCreateOtpPending ? 'Отправка…' : 'Продолжить'}
      </Button>
    </form>
  );
}

const CreateOtpForm = observer(CreateOtpFormComponent);

export { CreateOtpForm };
