import { browser } from "$app/environment";
import { readable } from "svelte/store";

const reduced_motion_query = "(prefers-reduced-motion: reduce)";

const get_initial_motion_preference = (): boolean => {
    if (!browser) return false;
    return window.matchMedia(reduced_motion_query).matches;
};

export const reduced_motion = readable(
    get_initial_motion_preference(),
    (set) => {
        if (browser) {
            const set_reduced_motion = (e: MediaQueryListEvent) => {
                set(e.matches);
            };
            const media_query_list = window.matchMedia(reduced_motion_query);
            media_query_list.addEventListener("change", set_reduced_motion);

            return (): void => {
                media_query_list.removeEventListener(
                    "change",
                    set_reduced_motion,
                );
            };
        }
        return () => {
            /* noop */
        };
    },
);
