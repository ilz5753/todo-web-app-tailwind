import { useMediaQuery } from "react-responsive";

export default function useResponsive() {
  let isSm = useMediaQuery({ query: "(min-width: 640px)" });
  return { isSm };
}
