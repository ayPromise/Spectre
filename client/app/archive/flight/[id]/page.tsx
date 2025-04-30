interface ArchiveByIdProps {
    params: {
        type: string;
        id: string;
    };
}

const ArchiveByIdPage: React.FC<ArchiveByIdProps> = ({ params }: ArchiveByIdProps) => {
    const { type, id } = params;

    return <>{type} {id}</>;
}

export default ArchiveByIdPage