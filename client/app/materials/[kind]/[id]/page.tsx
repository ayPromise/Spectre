interface MaterialPageProps {
  params: {
    kind: string;
    id: string;
  };
}

const MaterialPage: React.FC<MaterialPageProps> = ({
  params,
}: MaterialPageProps) => {
  const { kind, id } = params;

  return (
    <>
      {kind} {id}
    </>
  );
};

export default MaterialPage;
