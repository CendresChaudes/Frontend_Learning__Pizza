import styles from './Auth.page.m.css';

type TProperties = Readonly<{ example: string }>;

function AuthPage(properties: TProperties): ReactJSX {
  const { example } = properties;

  return <div className={styles.root}>{example}</div>;
}

export { AuthPage };
