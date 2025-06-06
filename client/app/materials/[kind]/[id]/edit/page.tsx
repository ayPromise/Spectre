interface MaterialEditPageProps {
  params: {
    kind: string;
    id: string;
  };
}

const MaterialEditPage: React.FC<MaterialEditPageProps> = ({
  params,
}: MaterialEditPageProps) => {
  const { kind, id } = params;

  return (
    <>
      {kind} {id}
    </>
  );
};

export default MaterialEditPage;
