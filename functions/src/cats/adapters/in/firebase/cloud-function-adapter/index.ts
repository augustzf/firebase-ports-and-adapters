import * as functions from 'firebase-functions'
import { BuyCatUseCase } from '../../../../domain/ports/in/buy-cat-use-case'

export class CloudFunctionAdapter {

    constructor(private service: BuyCatUseCase) { }

    buyCat = async (request: functions.https.Request, response: functions.Response) => {
        console.log(`buyCat`)
        // map cloud function model to suitable and validated domain model
        const { paymentDollars } = request.body
        if (!paymentDollars) {
            console.log(`missing request body 'paymentDollars`)
            return response.sendStatus(400)
        }
        await this.service.buyCat(parseInt(paymentDollars))
        return response.sendStatus(200)
    }
}

