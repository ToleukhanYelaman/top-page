import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export class HhData {
    @prop()
    count: number;

    @prop()
    juniorSallary: number;

    @prop()
    middleSallary: number;

    @prop()
    seniorSallary: number;
}

export class TopPageAdvatage {
    @prop()
    title: string;

    @prop()
    description: string;
}

export interface TopPageModel extends Base { }
export class TopPageModel extends TimeStamps {

    @prop({ enum: TopLevelCategory })
    firstLevelCategory: TopLevelCategory;

    @prop()
    secondCategory: string;

    @prop({ unique: true })
    alias: string

    @prop()
    title: string;

    @prop()
    category: string;

    @prop({ type: () => HhData })
    hh?: HhData;

    @prop({ type: () => TopPageAdvatage })
    advatages: TopPageAdvatage[];

    @prop()
    seoText: string;

    @prop()
    tagsTitle: string;

    @prop({ type: () => [String] })
    tags: string[];
}
