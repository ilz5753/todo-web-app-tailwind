import { includes, indexOf, isNull, map } from "lodash";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { useEffectOnce } from "usehooks-ts";
import { ITheme, IThemeContext, TThemeMode } from "./type";

const ThemeContext = createContext<null | IThemeContext>(null);
export const useTheme: () => IThemeContext = () => {
  let ctx = useContext(ThemeContext);
  if (isNull(ctx))
    throw new Error(`Wrap App inside of "ThemeProvider" Component.`);
  return ctx;
};
export const useActiveThemeColors = () => {
  let { activeThemeName, get } = useTheme();
  let { schemes, mode = "system" } = get(activeThemeName);
  let m = mode === "system" ? "dark" : mode;
  return schemes[m];
};

let FallbackTheme: ITheme = {
  name: "Fallback Theme",
  mode: "system",
  schemes: {
    light: {
      0: "#F7ECDE",
      1: "#354259",
      2: "#E9C597",
      //
      3: "#54BAB9",
      4: "#FFFFFF",
      5: "#FFFFFF",
      6: "#38938A",
      7: "#F6F6F6",
      8: "#38938A",
      //
      9: "#54BAB9",
      10: "#1D8A8A",
      11: "#38938A",
      12: "#F6F6F6",
      13: "#1D8A8A",
      14: "#38938A",
      //
      15: "#54BAB9",
      16: "#4CAF50",
      17: "#FFFFFF",
      18: "#FFFFFF",
      19: "#E4E4E4",
      20: "#44A0A0",
      21: "#FFFFFF",
      22: "#38938A",
      23: "rgba(255, 255, 255, 0.5)",
      24: "#858585",
    },
    dark: {
      0: "#1C273C",
      1: "#F7ECDE",
      2: "#E9C597",
      //
      3: "#354259",
      4: "#FFFFFF",
      5: "#FFFFFF",
      6: "#44A0A0",
      7: "#F6F6F6",
      8: "#44A0A0",
      //
      9: "#354259",
      10: "#44A0A0",
      11: "#44A0A0",
      12: "#F6F6F6",
      13: "#44A0A0",
      14: "#44A0A0",
      //
      15: "#354259",
      16: "#4CAF50",
      17: "#FFFFFF",
      18: "#FFFFFF",
      19: "#E4E4E4",
      20: "#44A0A0",
      21: "#FFFFFF",
      22: "#44A0A0",
      23: "rgba(0, 0, 0, 0.5)",
      24: "#7a7a7a",
    },
  },
};
const CustomStyleSheet = styled.div`
  ${({ styles }: any) => css`
    ${styles}
  `}
`;
// const generateStyles = (themes: ITheme[] = []) => {
//   return themes.map(({ name, schemes }) => {
//     const lightStyles = Object.entries(schemes.light)
//       .map(([key, color]) => {
//         return `--tw-${key}: ${color};`;
//       })
//       .join("\n");

//     const darkStyles = Object.entries(schemes.dark)
//       .map(([key, color]) => {
//         return `--tw-${key}: ${color};`;
//       })
//       .join("\n");

//     return `@layer base {
//         html[data-theme="${name}"][data-theme-mode="light"] { ${lightStyles} }
//         html[data-theme="${name}"][data-theme-mode="dark"] { ${darkStyles} }
//       }`;
//   });
// };
const generateStyles = ({ name, schemes }: ITheme) => {
  const lightStyles = Object.entries(schemes.light)
    .map(([key, color]) => {
      return `--tw-${key}: ${color};`;
    })
    .join("\n");

  const darkStyles = Object.entries(schemes.dark)
    .map(([key, color]) => {
      return `--tw-${key}: ${color};`;
    })
    .join("\n");

  return `@layer base {
      html[data-theme="${name}"][data-theme-mode="light"] { ${lightStyles} }
      html[data-theme="${name}"][data-theme-mode="dark"] { ${darkStyles} }
    }`;
};
const ThemeStyles = ({
  activeTheme,
  children,
}: PropsWithChildren<{ activeTheme: ITheme }>) => {
  const styles = useMemo(() => generateStyles(activeTheme), [activeTheme]);

  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    // styles.forEach((style) => {
    //   styleSheet.insertRule(style);
    // });
    styleSheet.insertRule(styles);
  }, [styles]);

  return <CustomStyleSheet {...{ styles, children }} />;
};
export default function ThemeProvider({ children }: PropsWithChildren) {
  let [themes, setThemes] = useState<ITheme[]>([FallbackTheme]);
  let [activeThemeName, setActiveThemeName] = useState(FallbackTheme.name);
  let [fbTheme, setFbTheme] = useState<ITheme>(FallbackTheme);
  let themeNames = useMemo(() => map(themes, ({ name }) => name), [themes]);
  let get = useCallback(
    (name: string) => {
      if (includes(themeNames, name)) {
        let index = indexOf(themeNames, name);
        return themes[index];
      }
      return fbTheme;
    },
    [themeNames, themes, fbTheme]
  );
  let activeTheme = useMemo(() => get(activeThemeName), [get, activeThemeName]);
  let add = useCallback(
    (theme: ITheme) => {
      if (!includes(themeNames, theme.name)) setThemes((p) => [...p, theme]);
    },
    [themeNames]
  );
  let update = useCallback(
    (previousName: string, theme: Partial<ITheme>) => {
      if (includes(themeNames, previousName)) {
        let index = indexOf(themeNames, previousName);
        setThemes((p) => {
          let c = [...p];
          c[index] = { ...c[index], ...theme };
          return c;
        });
      }
    },
    [themeNames]
  );
  let updateMode = useCallback(
    (name: string, newMode?: TThemeMode) => {
      if (includes(themeNames, name)) {
        let index = indexOf(themeNames, name);
        setThemes((p) => {
          let c = [...p];
          c[index].mode = newMode;
          return c;
        });
      }
    },
    [themeNames]
  );
  let remove = useCallback(
    (name: string) => {
      if (includes(themeNames, name)) {
        let index = indexOf(themeNames, name);
        setThemes((p) => {
          let c = [...p];
          c.splice(index, 1);
          return c;
        });
      }
    },
    [themeNames]
  );
  let updateFallbackTheme = useCallback((theme: ITheme) => {
    setFbTheme(theme);
  }, []);
  let switchTheme = useCallback(
    (name: string, mode: TThemeMode) => {
      if (includes(themeNames, name)) {
        const htmlElement = document.documentElement;
        // Get a list of all HTML attributes on the element
        const attributes = htmlElement.attributes;

        // Loop through the attributes and remove any that start with "data-theme-"
        for (let i = attributes.length - 1; i >= 0; i--) {
          const attribute = attributes[i];
          if (attribute.name.startsWith("data-theme-")) {
            htmlElement.removeAttribute(attribute.name);
          }
        }
        // setActiveThemeName(name);
        // update(name, { mode });
        // // document.documentElement.removeAttribute("data-theme");
        // // document.documentElement.removeAttribute("data-theme-mode");
        // // document.documentElement.setAttribute("data-theme", name);
        // // document.documentElement.setAttribute("data-theme-mode", mode);
        // htmlElement.setAttribute("data-theme", name);
        // htmlElement.setAttribute("data-theme-mode", mode);
        setTimeout(() => {
          setActiveThemeName(name);
          update(name, { mode });
          htmlElement.setAttribute("data-theme", name);
          htmlElement.setAttribute("data-theme-mode", mode);
        }, 10);
      }
    },
    [themeNames, update]
  );
  useEffectOnce(() => {
    switchTheme(activeThemeName, "dark");
  });
  return (
    <ThemeContext.Provider
      {...{
        value: {
          add,
          update,
          updateMode,
          remove,
          updateFallbackTheme,
          get,
          themeNames,
          activeThemeName,
          updateActiveThemeName: setActiveThemeName,
          switchTheme,
          activeTheme,
        },
      }}
    >
      <ThemeStyles {...{ activeTheme, children }} />
    </ThemeContext.Provider>
  );
}
