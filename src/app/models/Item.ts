export class Item {

    private _productId: number;
    private _quantity: number;

    public get productId(): number {
        return this._productId;
    }
    public set productId(value: number) {
        this._productId = value;
    }

    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }
}
