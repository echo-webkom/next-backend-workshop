type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="py-24 px-4 max-w-2xl w-full flex flex-col mx-auto">
      {children}
    </div>
  );
}
