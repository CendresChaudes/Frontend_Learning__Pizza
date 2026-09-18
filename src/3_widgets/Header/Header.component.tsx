import styles from './Header.component.m.css';

type TProperties = Readonly<{
  title: string;
}>;

function Header(properties: TProperties): ReactJSX {
  const { title } = properties;

  return <div className={styles.root}>{title}</div>;
}

export { Header };
