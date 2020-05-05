import * as functions from 'firebase-functions'
import * as express from 'express'
import { BuyCatUseCase } from '../../../../domain/ports/in/buy-cat-use-case'

export class CloudFunctionAdapter {
    private app: express.Application

    constructor(private service: BuyCatUseCase) {
        this.app = express()
        this.app.post("/buy", this.buyCat)
    }

    dispatch = async (request: functions.https.Request, response: functions.Response) => {
        return this.app(request, response)
    }

    buyCat = async (request: express.Request, response: express.Response) => {
        console.log(`buyCat`)
        // map cloud function model to suitable and validated domain model
        const { paymentDollars } = request.body
        if (!paymentDollars) {
            console.log(`missing request body 'paymentDollars`)
            return response.sendStatus(400)
        }
        const name = await this.service.buyCat(parseInt(paymentDollars))
        return response.status(200).send(JSON.stringify({ name }))
    }
}

