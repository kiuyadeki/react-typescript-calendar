import { useCallback, useState } from "react";
import { PersonNodeData } from "../types/PersonNodeData";

type Props = {
  id: string;
  users: Array<PersonNodeData>;
  onOpen: () => void;
};

export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<PersonNodeData | null>(null);
  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    const targetUser = users.find(user => user.id === id);
    if (targetUser) {
      setSelectedUser(targetUser);
      onOpen();
    }
  }, []);
  return {
    onSelectUser,
    selectedUser,
  };
};
