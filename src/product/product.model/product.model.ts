import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class ProductChacteristic{
    @prop()
    name: string;

    @prop()
    value: string;
}

export interface ProductModel extends Base { }
export class ProductModel extends TimeStamps {
    @prop()
    image: string;

    @prop()
    title: string;

    @prop()
    price: number;

    @prop()
    oldPrice: number;

    @prop()
    credit: number;

    @prop()
    description: string;

    @prop()
    advantages: string;

    @prop()
    disAdvatages: string;

    @prop({ type: () => [String] })
    categories: string[];

    @prop({ type: () => [String] })
    tags: string[];

    @prop({type: ()=> [ProductChacteristic], _id: false})
    characteristics: ProductChacteristic[]
}
