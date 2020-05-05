import test from 'ava'
import { CatDb } from '../ports/out/cat-db'
import { BuyCatService } from './buy-cat-service'
import { Cat } from '../entities/cat'

class MockCatDb implements CatDb {
    async saveCat(cat: Cat) { return }
    async loadCat(id: string) { return new Cat("1", "Tom") }
    async loadAllCats() { return [new Cat("1", "Tom"), new Cat("2", "Bob")] }
}
const db = new MockCatDb()
const service = new BuyCatService(db)

test('should not accept too low payment', async t => {
    const name = await t.throwsAsync(service.buyCat(1))
    t.truthy(name)
})

test('should buy a cat given correct payment', async t => {
    const name = await service.buyCat(10)
    t.truthy(name)
})