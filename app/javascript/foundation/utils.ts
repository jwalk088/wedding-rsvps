import { useMediaQuery } from "react-responsive";
import { styles } from ".";

export function isMobile() {
  return useMediaQuery({
    query: `(max-width: ${styles.MOBILE_WIDTH}px)`,
  });
}
