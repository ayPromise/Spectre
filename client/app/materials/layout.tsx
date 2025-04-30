import SubNavHeader from "./components/SubNavHeader";

export default function MaterialsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <SubNavHeader />
            {children}
        </div>
    );
}
