type TProperties = Readonly<{
  title: string;
}>;

function Header(properties: TProperties): ReactJSX {
  const { title } = properties;

  return (
    <div className="position-sticky top-0 right-0 left-0 z-10 bg-primary px-6 py-4 text-start text-xl leading-normal font-bold text-white">
      {title}
    </div>
  );
}

export { Header };
