import { Item } from './Item';

export class Order {

    private _items: Item[];
    private _email: string;

    public get items(): Item[] {
        return this._items;
    }
    public set items(value: Item[]) {
        this._items = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }


}
