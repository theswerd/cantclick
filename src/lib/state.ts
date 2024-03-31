import { onMount } from "svelte";
import { writable } from "svelte/store";

export const CIRCLE_COUNT = 6;
type State = "waiting" | "window_to_small" | "mobile" | "game";
export const CIRCLE_RADIUS = 80;
export const appState = writable(
  {
    
    state: "waiting" as State,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    mouseX: 0,
    mouseY: 0,
    mouseVisible: true,
    mouseGlitching: false,
    circles: [] as {
      x: number;
      y: number;
      id: string;
    }[]
  },
  () => {
    const { subscribe, set, update } = appState;

    onMount(() => {
      update((state) => {
        return {
          ...state,
          windowHeight: window.innerHeight,
          windowWidth: window.innerWidth,
        };
      });
      if (/Mobi/.test(navigator.userAgent)) {
        update((state) => {
          return {
            ...state,
            state: "mobile",
          };
        });
      }
      window.addEventListener("mousemove", (e) => {
        update((state) => {
          return {
            ...state,
            mouseX: e.clientX,
            mouseY: e.clientY,
            // mouseVisible: true,
          };
        });
      });
      //   on become secondary document
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          update((state) => {
            return {
              ...state,
              mouseVisible: false,
            };
          });
        } else if (document.visibilityState === "visible") {
          update((state) => {
            return {
              ...state,
              mouseVisible: true,
            };
          });
        }
      });
    //   on mouse leave window
        document.addEventListener("mouseleave", () => {
            update((state) => {
            return {
                ...state,
                mouseVisible: false,
            };
            });
        });
        // on mouse enter window
        document.addEventListener("mouseenter", () => {
            update((state) => {
            return {
                ...state,
                mouseVisible: true,
            };
            });
        });
        // on mouse enter
        document.addEventListener("mouseover", () => {
            update((state) => {
            return {
                ...state,
                mouseVisible: true,
            };
            });
        });

      window.addEventListener("resize", () => {
        if (window.innerWidth < 800 || window.innerHeight < 600) {
          update((state) => {
            return {
              ...state,
              windowHeight: window.innerHeight,
              windowWidth: window.innerWidth,
              state: "window_to_small",
            };
          });
        } else {
          update((state) => {
            return {
              ...state,
              windowHeight: window.innerHeight,
              windowWidth: window.innerWidth,

              state: "waiting",
            };
          });
        }
      });
    });
  }
);


