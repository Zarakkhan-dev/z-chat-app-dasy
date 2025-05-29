export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/v1/" : "/api/v1/";

// Auth Routes
export const FETCHME_URL = "auth/me";
export const SIGN_UP_URL = "/auth/signup";
export const LOGIN_URL = "/auth/login";
export const ONBOARDED_URL = "/auth/onboard";
export const LOGOUT_URL = "/auth/logout";

// User Routes
export const RECOMMENDED_USERS_URL = "/user";
export const FRIENDS_URL = "/user/friends";
export const OUTGOING_FRIEND_REQUESTS_URL = "/user/outgoing-friends-requests";
export const SEND_FRIENDS_REQUEST_URL = "/user/friend-request";
export const GET_FRIENDS_REQUEST_URL = "/user/friend-requests";
export const ACCEPT_FRIENDS_REQUEST_URL = "/user/friend-request/accept";

// Chat Routes
export const CHAT_TOKEN_URL = "chat/token";