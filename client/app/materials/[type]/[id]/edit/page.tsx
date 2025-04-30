interface MaterialEditPageProps {
    params: {
        type: string;
        id: string;
    };
}

const MaterialEditPage: React.FC<MaterialEditPageProps> = ({ params }: MaterialEditPageProps) => {
    const { type, id } = params;

    return <>{type} {id}</>;
}

export default MaterialEditPage