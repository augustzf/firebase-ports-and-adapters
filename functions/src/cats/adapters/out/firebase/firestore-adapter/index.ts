import admin = require("firebase-admin");
import { CatDb } from "../../../../domain/ports/out/cat-db"
import { Cat } from "../../../../domain/entities/cat"

export class CatFirestoreAdapter implements CatDb {
    async loadAllCats(): Promise<Cat[]> {
        const data = await admin.firestore().collection('cats').get()
        return data.docs.map(doc => new Cat(doc.id, doc.data()['name']))
    }

    async loadCat(id: string) {
        const doc = await admin.firestore().collection('cats').doc(id).get()
        if (!doc.exists) {
            throw Error(`No Cat with id ${id}`)
        }
        return new Cat(id, doc.data()!['name'])
    }

    async saveCat(cat: Cat) {
        const ref = admin.firestore().collection('cats').doc(cat.id)
        const obj = {
            name: cat.name
        }
        await ref.set(obj)
    }
}