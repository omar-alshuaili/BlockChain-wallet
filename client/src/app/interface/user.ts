export interface User {
        name:string
        _id: string
        jwtToken: string,
        pic:string
        wallets:Array<string>,
        email:string,
        isVerified:boolean
}
