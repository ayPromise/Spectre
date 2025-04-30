interface MaterialsTypePageProps {
    params: {
        type: string;
    };
}

const MaterialsTypePage: React.FC<MaterialsTypePageProps> = ({ params }: MaterialsTypePageProps) => {
    const { type } = params;

    return <>{type}</>;
}

export default MaterialsTypePage