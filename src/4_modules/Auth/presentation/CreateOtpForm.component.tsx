import { observer } from 'mobx-react-lite';
import { useViewModel } from '~shared/lib';
import { Button, Input } from '~shared/ui';
import { AuthWizardViewModel } from './AuthWizard.vm';
import styles from './CreateOtpForm.component.m.css';

function CreateOtpFormComponent(): ReactJSX {
  const viewModel = useViewModel(() => new AuthWizardViewModel());

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    viewModel.setPhone(event.target.value);
  };

  const handleOtpCreate = () => {
    viewModel.createOtp();
  };

  return (
    <div className={styles.root}>
      <p className={styles.intro}>Введите номер телефона для входа в свой профиль</p>

      <Input
        value={viewModel.phone}
        onChange={handlePhoneChange}
        type="text"
        placeholder="Номер телефона"
      />

      <Button
        onClick={handleOtpCreate}
        disabled={viewModel.isCreateOtpPending}
      >
        Продолжить
      </Button>
    </div>
  );
}

const CreateOtpForm = observer(CreateOtpFormComponent);

export { CreateOtpForm };
