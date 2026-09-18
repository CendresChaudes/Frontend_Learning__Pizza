import { AuthWizard } from '~modules/Auth';
import { Container } from '~shared/ui';
import styles from './Auth.page.m.css';

function AuthPage(): ReactJSX {
  return (
    <Container>
      <div className={styles.root}>
        <AuthWizard />
      </div>
    </Container>
  );
}

export { AuthPage };
