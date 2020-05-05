// the app configuration: how the app is assembled

// driven (secondary) adapters
import { CatFirestoreAdapter } from "./cats/adapters/out/firebase/firestore-adapter"
const db = new CatFirestoreAdapter()

// domain logic
import { BuyCatService } from "./cats/domain/services/buy-cat-service"
const buyCatService = new BuyCatService(db)

// driving (primary) adapters
import { CloudFunctionAdapter } from "./cats/adapters/in/firebase/cloud-function-adapter"
const firebaseAdapter = new CloudFunctionAdapter(buyCatService)

export { firebaseAdapter }

