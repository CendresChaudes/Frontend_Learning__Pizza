import { observer } from 'mobx-react-lite';
import { useViewModel } from '~shared/lib';
import styles from './Header.component.m.css';
import { HeaderViewModel } from './Header.vm';

function HeaderComponent(): ReactJSX {
  const viewModel = useViewModel(() => new HeaderViewModel());

  return <div className={styles.root}>{viewModel.title}</div>;
}

const Header = observer(HeaderComponent);

export { Header };
