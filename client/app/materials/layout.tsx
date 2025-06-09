import SubNavHeader from "./components/SubNavHeader";

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <SubNavHeader />
      {children}
    </div>
  );
}
