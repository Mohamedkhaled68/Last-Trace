import { create } from "zustand";
import Cookies from "js-cookie";

interface State {
    token: string | null;
}

interface Actions {
    signIn: (token: string) => void;
    signOut: () => void;
}

const useTokenStore = create<State & Actions>((set) => ({
    token: Cookies.get("LAST_TRACE_Token") || null,
    signIn: (token: string) => {
        Cookies.set("LAST_TRACE_Token", token, { expires: 7 });
        set({ token: token });
    },
    signOut: () => {
        Cookies.remove("LAST_TRACE_Token");
        set({ token: null });
    },
}));

export default useTokenStore;
