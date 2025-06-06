interface MaterialsTypePageProps {
  params: {
    kind: string;
  };
}

const MaterialsTypePage: React.FC<MaterialsTypePageProps> = ({
  params,
}: MaterialsTypePageProps) => {
  const { kind } = params;

  return <>{kind}</>;
};

export default MaterialsTypePage;
