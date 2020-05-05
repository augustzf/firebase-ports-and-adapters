import admin = require("firebase-admin");
admin.initializeApp()

import * as functions from 'firebase-functions'
import { firebaseAdapter } from "./app"

// expose cloud functions to Firebase
export const buyCatApi = functions.https.onRequest(firebaseAdapter.buyCat)

