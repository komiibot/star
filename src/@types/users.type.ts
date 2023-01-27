import Leveling from "./leveling.type"

type UserType = {
    NORMAL
    PREMIUM
}

export default interface UsersType {
    id: string
    userType: UserType
    leveling: Leveling
    inventory: any
    blacklisted: boolean
    GuildUsers: any
    Economy: any
    UserSettings: any
}