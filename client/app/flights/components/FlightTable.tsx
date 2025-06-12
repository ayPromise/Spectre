"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { FlightTypeNameUA } from "@shared/types/Enums";
import { Flight } from "@shared/types";
import { useAuth } from "@/context/AuthContext";

type Props = {
  flights: Flight[];
  onDelete: (id: string) => void;
};

const FlightTable: React.FC<Props> = ({ flights, onDelete }) => {
  const { userData } = useAuth();
  return (
    <div className="overflow-x-auto rounded border">
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2 border-b">Назва</th>
            <th className="px-4 py-2 border-b">Дата</th>
            <th className="px-4 py-2 border-b">Тип</th>
            <th className="px-4 py-2 border-b text-center"></th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">
                <Link
                  href={`/flights/${flight._id}`}
                  className=" hover:underline"
                >
                  {flight.title}
                </Link>
              </td>
              <td className="px-4 py-2 border-b">
                {new Date(flight.date).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">
                {FlightTypeNameUA[flight.flightType]}
              </td>
              <td className="px-4 py-2 border-b text-center flex">
                <div className="w-1/2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = flight.filePath;
                      link.download = "";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <DownloadIcon size={16} />
                  </Button>
                </div>
                <div className="w-1/2">
                  {userData?.sub === flight.userId && (
                    <Button
                      variant="destructive"
                      onClick={() => onDelete(flight._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
