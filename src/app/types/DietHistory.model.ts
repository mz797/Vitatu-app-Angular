import { Diet } from "./Diet.model";

export class DietHistory{
    constructor(
        private _date: string,
        private _dietList:Diet[],
        private _kcal:number,
        private _carbo:number,
        private _protein:number,
        private _fat:number,
        private _visibility:boolean){}
        
        get date():string{
            return this._date
        }
        set date(date:string){
             this._date=date;
        }
        get dietList():Diet[]{
            return this._dietList
        }

        get kcal():number{
            return this._kcal
        }
        set kcal(kcal:number){
            this._kcal=kcal;
       }
        get carbo():number{
            return this._carbo
        }
        set carbo(carbo:number){
            this._carbo=carbo;
       }
        get protein():number{
            return this._protein
        }
        set protein(protein:number){
            this._protein=protein;
       }
        get fat():number{
            return this._fat
        }
        set fat(fat:number){
            this._fat=fat;
       }
        get visibility():boolean{
            return this._visibility
        }
        set visibility(visibility:boolean){
            this._visibility=visibility;
       }
}