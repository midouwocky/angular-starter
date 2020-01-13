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
}
