import SubNavHeader from "./components/SubNavHeader";

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNavHeader />
      {children}
    </>
  );
}
