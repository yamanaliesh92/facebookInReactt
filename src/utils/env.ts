type Key = "REACT_APP_MODE" | "REACT_APP_SERVER";

interface IGetEnv {
  IKey: Key;
  DefaultValue?: string;
}

export function getEnv(args: IGetEnv): string {
  const { IKey, DefaultValue } = args;
  const value = process.env[IKey] ?? DefaultValue;
  if (!value) {
    throw new Error("key is not found");
  }
  return value;
}
