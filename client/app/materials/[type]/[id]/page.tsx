interface MaterialPageProps {
    params: {
        type: string;
        id: string;
    };
}

const MaterialPage: React.FC<MaterialPageProps> = ({ params }: MaterialPageProps) => {
    const { type, id } = params;

    return <>{type} {id}</>;
}

export default MaterialPage