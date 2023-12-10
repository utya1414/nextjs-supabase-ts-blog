import { create } from "zustand"
import type { Database } from "../lib/database.types"
export type UserType = Database["public"]["Tables"]["users"]["Row"]
export type ProfileType = Database["public"]["Tables"]["profiles"]["Row"]

type UserInfo = {
    id: string
    email: string
    name: string | null
    avatar_url: string | null
    introduce: string | null
}
type StateType = {
    user: UserInfo | null
    setUser: (payload: UserInfo) => void
}

const useStore = create<StateType>((set) => ({
    user: { id: "", email: "", name: "", avatar_url: "", introduce: ""},
    setUser: (payload) => set({ user: payload }),
}))

export default useStore