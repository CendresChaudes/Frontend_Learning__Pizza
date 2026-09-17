import styles from './Header.module.css';

type TProperties = Readonly<{
  title: string;
}>;

function Header(properties: TProperties): ReactJSX {
  const { title } = properties;

  return <div className={styles.root}>{title}</div>;
}

export { Header };
