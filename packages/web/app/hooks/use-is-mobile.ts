import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${em(767)})`);
}
