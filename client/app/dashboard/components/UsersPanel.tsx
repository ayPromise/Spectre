"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { User } from "@shared/types";
import { getAllUsers } from "../utils/getAllUsers";
import getAllMaterials from "@/app/materials/utils/getAllMaterials";
import { getAchievements } from "@/app/profile/achievements/utils/getAchievements";
import { deleteUser } from "../utils/deleteUser";
import { editUser } from "../utils/editUser";
import MultiSelect from "@/components/custom/MultiSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil } from "lucide-react";
import Loader from "@/components/custom/Loader";
import { showError, showSuccess } from "@/utils/toast";
import Link from "next/link";

export default function UsersPanel() {
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { data: materials } = useQuery({
    queryKey: ["materials"],
    queryFn: getAllMaterials,
  });
  const { data: achievements } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      showSuccess("Користувача видалено");
      refetch();
    },
    onError: () => showError("Помилка при видаленні"),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<User> }) => {
      console.log(id, updates);
      return editUser(id, updates);
    },
    onSuccess: () => {
      showSuccess("Оновлено");
      refetch();
    },
    onError: () => showError("Помилка при оновленні"),
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    if (!users) return [];
    return users.filter((u) =>
      [u.firstName, u.lastName, u.email, u.phoneNumber].some((v) =>
        v?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  if (!users || !materials || !achievements) return <Loader />;

  return (
    <div className="space-y-4">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Пошук..."
        className="max-w-md mb-4"
      />

      <div className="overflow-x-auto rounded border max-w-full">
        <table className="w-full table-auto text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b min-w-[200px]">Ім’я</th>
              <th className="px-4 py-2 border-b min-w-[250px]">Пошта</th>
              <th className="px-4 py-2 border-b min-w-[180px]">
                Номер телефону
              </th>
              <th className="px-4 py-2 border-b min-w-[300px]">
                Статус матеріалів
              </th>
              <th className="px-4 py-2 border-b min-w-[250px]">Досягнення</th>
              <th className="px-4 py-2 border-b min-w-[120px] text-center sticky right-0 z-10 bg-gray-100 border-l-2">
                Дії
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              const isEditing = editingId === user._id;

              const renderMulti = (
                key: keyof User,
                opts: { label: string; value: string }[]
              ) => (
                <MultiSelect
                  options={opts}
                  selectedValues={
                    tempValues[`${user._id}.${key}`] ?? (user[key] as string[])
                  }
                  setSelectedValues={(sel) =>
                    setTempValues((prev) => ({
                      ...prev,
                      [`${user._id}.${key}`]: sel,
                    }))
                  }
                  placeholder="Оберіть..."
                />
              );

              return (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    {isEditing ? (
                      <div className="space-y-1">
                        <Input
                          placeholder="Ім’я"
                          value={
                            tempValues[`${user._id}.firstName`] ??
                            user.firstName
                          }
                          onChange={(e) =>
                            setTempValues((prev) => ({
                              ...prev,
                              [`${user._id}.firstName`]: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder="Прізвище"
                          value={
                            tempValues[`${user._id}.lastName`] ?? user.lastName
                          }
                          onChange={(e) =>
                            setTempValues((prev) => ({
                              ...prev,
                              [`${user._id}.lastName`]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ) : (
                      `${user.firstName} ${user.lastName}`
                    )}
                  </td>

                  <td className="px-4 py-2 border-b">
                    {isEditing ? (
                      <Input
                        placeholder="Email"
                        value={tempValues[`${user._id}.email`] ?? user.email}
                        onChange={(e) =>
                          setTempValues((prev) => ({
                            ...prev,
                            [`${user._id}.email`]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  <td className="px-4 py-2 border-b">
                    {isEditing ? (
                      <Input
                        placeholder="Телефон"
                        value={
                          tempValues[`${user._id}.phoneNumber`] ??
                          user.phoneNumber
                        }
                        onChange={(e) =>
                          setTempValues((prev) => ({
                            ...prev,
                            [`${user._id}.phoneNumber`]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      user.phoneNumber
                    )}
                  </td>

                  <td className="px-4 py-2 border-b">
                    {!isEditing ? (
                      <div className="text-sm text-gray-700 space-y-1">
                        {(() => {
                          const allLinks = [
                            "completedArticles",
                            "completedLectures",
                            "completedVideos",
                          ]
                            .flatMap((key) => {
                              const ids = user[key as keyof typeof user] as
                                | string[]
                                | undefined;
                              if (!ids) return [];

                              return ids.map((id) => {
                                const m = materials.find(
                                  (mat) => mat._id === id
                                );
                                return m ? (
                                  <Link
                                    key={id}
                                    href={`/materials/${m.kind}/${m._id}`}
                                    className="hover:underline"
                                  >
                                    {m.title}
                                  </Link>
                                ) : null;
                              });
                            })
                            .filter(Boolean);

                          return allLinks.flatMap((link, idx) =>
                            idx < allLinks.length - 1 ? [link, ", "] : [link]
                          );
                        })()}
                      </div>
                    ) : (
                      <>
                        <div className="text-xs font-medium text-gray-500 mt-2">
                          Статті
                        </div>
                        {renderMulti(
                          "completedArticles",
                          materials
                            .filter((m) => m.kind === "Article")
                            .map((m) => ({ label: m.title, value: m._id }))
                        )}

                        <div className="text-xs font-medium text-gray-500 mt-2">
                          Лекції
                        </div>
                        {renderMulti(
                          "completedLectures",
                          materials
                            .filter((m) => m.kind === "Lecture")
                            .map((m) => ({ label: m.title, value: m._id }))
                        )}

                        <div className="text-xs font-medium text-gray-500 mt-2">
                          Відео
                        </div>
                        {renderMulti(
                          "completedVideos",
                          materials
                            .filter((m) => m.kind === "Video")
                            .map((m) => ({ label: m.title, value: m._id }))
                        )}
                      </>
                    )}
                  </td>

                  <td className="px-4 py-2 border-b">
                    {isEditing ? (
                      renderMulti(
                        "achievements",
                        achievements.map((a) => ({
                          label: a.title,
                          value: a._id,
                        }))
                      )
                    ) : (
                      <ul className="list-disc list-inside text-sm">
                        {(user.achievements || []).map((id) => {
                          const a = achievements.find((x) => x._id === id);
                          return <li key={id}>{a?.title || "—"}</li>;
                        })}
                      </ul>
                    )}
                  </td>

                  <td className="px-2 py-2 border-b sticky right-0 min-w-[140px] z-10 bg-white border-l-2">
                    <div className="gap-3 h-full flex justify-center">
                      {isEditing ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => {
                              const updates: any = {};
                              const fieldsToSave = [
                                "firstName",
                                "lastName",
                                "phone",
                                "email",
                                "completedArticles",
                                "completedLectures",
                                "completedVideos",
                                "achievements",
                              ];

                              fieldsToSave.forEach((k) => {
                                const key = `${user._id}.${k}`;
                                if (tempValues[key] !== undefined) {
                                  updates[k] = tempValues[key];
                                }
                              });

                              editMutation.mutate({ id: user._id, updates });
                              setEditingId(null);
                              setTempValues({});
                            }}
                          >
                            Зберегти
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(null);
                              setTempValues({});
                            }}
                          >
                            Скасувати
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(user._id)}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMutation.mutate(user._id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
