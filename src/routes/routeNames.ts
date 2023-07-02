export enum navigatorNames {
  MAIN = "MainNavigator",
  AUTH = "AuthNavigator",
  ANNOUNCEMENT = "AnnouncementNavigator",
  TAB = "TabNavigator",
}

export const routeNames = {
  [navigatorNames.TAB]: {
    HOME: 'Home',
    CREATE_ANNOUNCEMENT: 'CreateAnnouncement',
    FAVORITES_PAGE: 'FavoritesPage',
    USER_PROFILE: 'UserProfile',
  },
  [navigatorNames.ANNOUNCEMENT]: {
    HOME: 'AnnouncementHome',
    CREATE: 'AnnouncementCreate',
  },
  [navigatorNames.AUTH]: {
    LOGIN: 'Login',
    CREATE_ACCOUNT: 'CreateAccount'
  }
}