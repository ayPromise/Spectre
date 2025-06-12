"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { getFlights } from "./utils/getFlights";
import { deleteFlight } from "./utils/deleteFlight";
import { showError, showSuccess } from "@/utils/toast";
import CreateFlightDialog from "./components/CreateFlightDialog";
import FlightTable from "./components/FlightTable";

const FlightsPage = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["flights"],
    queryFn: getFlights,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFlight,
    onSuccess: () => {
      showSuccess("Політ видалено");
      refetch();
    },
    onError: (err: Error) => showError(err.message),
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <CreateFlightDialog refetch={refetch} />
      </div>

      {isLoading && <Loader />}
      {isError && <ErrorMessage>{(error as Error).message}</ErrorMessage>}

      {data && <FlightTable flights={data} onDelete={handleDelete} />}
    </div>
  );
};

export default FlightsPage;
