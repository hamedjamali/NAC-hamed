import create from 'zustand';

export interface UserEntity {
  id: number;
  name: string;
  userName: string;
  email: string;
  phone: string;
  status: 'active' | 'not_active' | null;
}

interface UserStore {
  users: UserEntity[];
  addUser: (user: UserEntity) => void;
  updateUser: (user: UserEntity) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (user) => set((state) => ({
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),
}));
