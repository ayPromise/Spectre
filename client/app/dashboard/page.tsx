import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import UsersPanel from "./components/UsersPanel";

const DashboardPage: React.FC = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Панель керування</h1>
        <Link href={"/dashboard/create-user"}>
          <Button>Створити користувача</Button>
        </Link>
      </div>

      <UsersPanel />
    </>
  );
};

export default DashboardPage;
