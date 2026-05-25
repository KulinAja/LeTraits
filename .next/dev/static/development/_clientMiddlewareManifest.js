self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next\\/static|_next\\/image|images|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.css).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.css).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()