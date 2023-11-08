import Dexie, { Table } from 'dexie';

interface FavoritesFolder {
  id?: number;
  typeName: string;
}

interface Cover {
  type: 'img' | 'text';
  src: string;
}

interface FavoritesItem {
  id?: number;
  folderId: number;
  name: string;
  typeName: string;
  url?: string;
  cover: Cover;
}

export class FavoritesDB extends Dexie {
  favoritesFolder!: Table<FavoritesFolder, number>;
  favoritesItem!: Table<FavoritesItem, number>;
  constructor() {
    super('FavoritesDB');
    this.version(1).stores({
      favoritesFolder: '++id, typeName',
      favoritesItem: '++id, folderId, typeName',
    });
  }

  deleteFolder(folderId: number) {
    return this.transaction(
      'rw',
      this.favoritesItem,
      this.favoritesFolder,
      () => {
        this.favoritesItem.where({ folderId }).delete();
        this.favoritesFolder.delete(folderId);
      },
    );
  }
}

export const db = new FavoritesDB();
