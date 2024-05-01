const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-screen flex-grow mx-auto">{children}</div>
  );
};

export default layout;
