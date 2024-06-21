import * as Yup from 'yup';

interface SetItemLocalStorage {
  key: string;
  value: string;
}

interface GetItemLocalStorage {
  key: string;
}

export class LocalStorageService {
  private static instance: LocalStorageService;

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  async setItem(item: SetItemLocalStorage) {
    const validator = Yup.object<SetItemLocalStorage>({
      key: Yup.string().required(),
      value: Yup.string().required(),
    });
    try {
      await validator.validate(item);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
    return localStorage.setItem(item.key, item.value);
  }

  async clearItem(item: GetItemLocalStorage) {
    const validator = Yup.object<GetItemLocalStorage>({
      key: Yup.string().required(),
    });

    try {
      await validator.validate(item);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }

    localStorage.removeItem(item.key);
  }

  async getItem<T>(item: GetItemLocalStorage) {
    const validator = Yup.object<GetItemLocalStorage>({
      key: Yup.string().required(),
    });

    try {
      await validator.validate(item);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
    try {
      return JSON.parse(localStorage.getItem(item.key) || '') as T;
    } catch (error) {
      return localStorage.getItem(item.key) as T;
    }
  }
}
