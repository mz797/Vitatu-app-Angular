import { Diet } from "./Diet.model";

export interface DietHistory{
    date: string;
    dietList:Diet[];
    kcal:number;
    carbo:number;
    protein:number;
    fat:number;
    visibility:boolean
}