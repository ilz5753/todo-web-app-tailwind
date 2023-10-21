export type TSystemThemeMode = "system";
export type TScheme = "light" | "dark";
export type TThemeMode = TScheme | TSystemThemeMode;
export type TThemeColors = Record<number, string>;
export interface ITheme {
  name: string;
  mode?: TThemeMode;
  schemes: Record<TScheme, TThemeColors>;
}
export interface IThemeContext {
  add(theme: ITheme): void;
  update(previousName: string, theme: Partial<ITheme>): void;
  updateMode(name: string, newMode?: TThemeMode): void;
  remove(name: string): void;
  updateFallbackTheme(theme: ITheme): void;
  get(name: string): ITheme;
  themeNames: string[];
  activeThemeName: string;
  updateActiveThemeName(newName: string): void;
  switchTheme: (name: string, mode: TThemeMode) => void;
  activeTheme: ITheme;
}
