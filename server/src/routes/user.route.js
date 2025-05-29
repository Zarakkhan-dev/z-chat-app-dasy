import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest } from "../controllers/user.controller.js"
import { getFriendRequestDetails } from "../controllers/user.controller.js";
import { getOutgoingRequest } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.post("/friend-request/accept/:id", acceptFriendRequest);
router.get("/friend-requests", getFriendRequestDetails);
router.get("/outgoing-friends-requests", getOutgoingRequest)

export default router