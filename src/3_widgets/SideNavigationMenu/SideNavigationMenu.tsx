import './SideNavigationMenu.css';
import { NavLink, Tooltip } from '@mantine/core';
import type { Route } from 'mobx-route';
import { useState } from 'react';
import { cn } from '~shared/lib';
import CloseIcon from './assets/close.icon.svg';
import OpenIcon from './assets/open.icon.svg';

type TRoute = Route<string, {}, {}, {}>;

export type TNavigationItem = {
  label: string;
  icon: React.ReactNode;
  route: TRoute;
};

type TProperties = Readonly<{ items: TNavigationItem[] }>;

function SideNavigationMenu(properties: TProperties): ReactJSX {
  const { items } = properties;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = (): void => {
    setIsOpen((previous) => !previous);
  };

  return (
    <aside
      className={cn(
        'flex min-h-screen flex-col border-r border-r-disabled-light bg-white transition-[width] duration-200',
        isOpen ? 'w-50' : 'w-20',
      )}
    >
      <nav
        aria-label="Основная навигация"
        className="flex flex-1 flex-col overflow-auto"
      >
        {items.map((item) => (
          <Tooltip
            key={item.label}
            label={item.label}
            position="right"
            withArrow
            disabled={isOpen}
          >
            <NavLink
              label={
                isOpen ? (
                  item.label
                ) : (
                  <div className="flex size-12 items-center justify-center">
                    {item.icon}
                  </div>
                )
              }
              active={item.route.isOpened}
              onClick={() => item.route.open()}
            />
          </Tooltip>
        ))}
      </nav>

      <div className="mt-auto w-full">
        <NavLink
          className="mx-auto p-4"
          label={
            isOpen ? (
              <div className="flex items-center justify-center gap-2">
                <span className="text-primary-light">Закрыть</span>
                <CloseIcon className="size-8 text-primary-light" />
              </div>
            ) : (
              <OpenIcon className="size-10 text-primary-light" />
            )
          }
          onClick={toggle}
        />
      </div>
    </aside>
  );
}

export { SideNavigationMenu };
