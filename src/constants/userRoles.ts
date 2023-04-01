export enum UserTypesEnum {
  ANNOUNCER = "announcer",
  USER = "user",
  ADMIN = "admin"
}
export type UserTypes = UserTypesEnum.ADMIN | UserTypesEnum.ANNOUNCER | UserTypesEnum.USER