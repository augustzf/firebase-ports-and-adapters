export interface BuyCatUseCase {
    buyCat(paymentDollars: number): Promise<string>
}