import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import React from "react";

export default function useAsyncStorageState<T extends unknown>({
  key,
  initialValue,
}: Props<T>): [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  async function save() {
    try {
      await AsyncStorage.setItem(
        key,
        JSON.stringify({
          key: value,
        }),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async function restore() {
    setLoading(true);
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        const { key: storedValue } = JSON.parse(item);
        setValue(storedValue ?? value);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    restore();

    return setValue((value) => value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    save();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue, loading, setLoading];
}

interface Props<T> {
  initialValue: T;
  key: string;
}
