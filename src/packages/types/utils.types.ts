import { HydratedDocument, ObjectId, SchemaTimestampsConfig } from "mongoose";


/**
 * Model
 */
export type WithId<T> = T & {
    id: string;
};

export type WithIdAndTimestamps<T> = WithId<T> & {
    createdAt: string;
    updatedAt: string;
};

export type InstanceOf<T, M> = HydratedDocument<T> & {
    _doc: T & { _id: ObjectId };
} & M;

export type InstanceOfWithDates<T, M> = InstanceOf<T, M> & SchemaTimestampsConfig;


export type UnionItemsWithAll<t> = t | 'all'