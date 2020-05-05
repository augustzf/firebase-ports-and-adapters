import { Cat } from "../../entities/cat"

export interface CatDb {
    saveCat(cat: Cat): Promise<void>
    loadCat(id: string): Promise<Cat>
    loadAllCats(): Promise<Cat[]>
}