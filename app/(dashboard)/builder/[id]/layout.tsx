const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-screen flex-grow mx-auto">{children}</div>
  );
};

export default layout;
