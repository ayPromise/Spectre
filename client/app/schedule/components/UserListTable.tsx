import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsersByIds } from "../utils/fetchUsersByIds";
import unsubscribeFromSchedule from "../utils/unsubscribeFromSchedule";
import { showError, showSuccess } from "@/utils/toast";
import { Schedule } from "@shared/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const UserListTable: React.FC<{ schedule: Schedule }> = ({ schedule }) => {
  const [assignedUsers, setAssignedUsers] = useState(
    schedule.assignedUsers || []
  );
  const queryClient = useQueryClient();
  const { data: users, isLoading: areUsersLoading } = useQuery({
    queryKey: ["users", assignedUsers],
    queryFn: () => fetchUsersByIds(assignedUsers),
    enabled: assignedUsers.length > 0,
  });

  const { mutate: unsubscribe } = useMutation({
    mutationFn: (userId: string) =>
      unsubscribeFromSchedule(schedule!._id, userId),
    onSuccess: (_, userId) => {
      showSuccess("Користувача було успішно видалено");
      setAssignedUsers((prev) => prev.filter((id) => id !== userId));
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error: Error) => {
      showError(error.message || "Не вдалося видалити користувача");
    },
  });

  if (areUsersLoading) return <p>Завантаження...</p>;

  return (
    users && (
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Ім&apos;я</th>
            <th>Номер телефону</th>
            <th>Видалити</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <Button variant="outline" onClick={() => unsubscribe(user._id)}>
                  <X />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default UserListTable;
