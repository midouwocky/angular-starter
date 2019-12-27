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
        const itemString = localStorage.getItem('access_token');
        if (itemString) {
            return JSON.parse(itemString);
        } else {
            return null;
        }
    }

    static removeAuthToken() {
        localStorage.removeItem('access_token');
    }
}
