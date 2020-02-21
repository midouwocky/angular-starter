import { User } from './models/user.model';

export class StorageUtils {
  static setItem(item: any) {
    localStorage.setItem('item-name', JSON.stringify(item));
  }

  static getItem(): any {
    const itemString = localStorage.getItem('item-name');
    if (itemString) {
      return JSON.parse(itemString);
    } else {
      return null;
    }
  }

  static removeItem() {
    localStorage.removeItem('item-name');
  }

  static setAuthToken(item: any) {
    localStorage.setItem('access_token', JSON.stringify(item));
  }

  static getAuthToken(): any {
    const accessTokenString = localStorage.getItem('access_token');
    if (accessTokenString) {
      return JSON.parse(accessTokenString);
    } else {
      return null;
    }
  }

  static removeAuthToken() {
    localStorage.removeItem('access_token');
  }

  static setUser(item: User) {
    localStorage.setItem('user', JSON.stringify(item));
  }

  static getUser(): User {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  }

  static removeUser() {
    localStorage.removeItem('user');
  }
}
