import { BuyCatUseCase } from "../ports/in/buy-cat-use-case"
import { CatDb } from "../ports/out/cat-db"
import { Cat } from '../entities/cat'

import _ = require("lodash")
import * as uuid from 'uuid'

class BuyCatService implements BuyCatUseCase {

    // the service must be injected a db instance
    constructor(private db: CatDb) { }

    buyCat = async (paymentDollars: number) => {
        if (paymentDollars < 10) {
            throw Error(`Cats cost $10. ${paymentDollars} is not enough`)
        }
        // save
        const name = _.sample(['T', 'B', 'P', 'D'])! + _.sample(['o', 'i', 'a', 'y'])! + _.sample(['m', 'p', 'y', 'r'])!
        const cat = new Cat(uuid.v4(), name)
        await this.db.saveCat(cat)
        return name
    }
}

export { BuyCatService }