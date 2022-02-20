import { useRouter } from "next/router";
import { LOGIN_ROUTE } from "../utils/constants";

export function useLogoutUser(logoutCallback: () => void) {
    const router = useRouter();

    return async () => {
        await logoutCallback();
        router.push(LOGIN_ROUTE);
    };
}
