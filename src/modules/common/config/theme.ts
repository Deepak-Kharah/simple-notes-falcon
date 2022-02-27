// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
    components: {
        Button: {
            variants: {
                solid: {
                    bg: "gray.600",
                    color: "white",
                    _hover: {
                        bg: "gray.700",
                    },
                },
            },
        },
    },
});
