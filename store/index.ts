import { create } from "zustand"
import type { Database } from "../lib/database.types"
export type UserType = Database["public"]["Tables"]["users"]["Row"]

type StateType = {
    user: UserType | null
    setUser: (payload: UserType) => void
}

const useStore = create<StateType>((set) => ({
    user: { id: "", email: "", name: "" },
    setUser: (payload) => set({ user: payload }),
}))

export default useStore