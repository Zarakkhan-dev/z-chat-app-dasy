import FriendRequestModal from "../models/FriendRequest.js";
import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });

    res.status(200).json({ success: true, recommendedUsers });
  } catch (error) {
    console.log("getRecommendedUsers controller error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const userFriendList = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profileImage nativeLanguage learningLanguage"
      );
    res.status(200).json({ success: true, friendList: userFriendList });
  } catch (error) {
    console.log("getMyFriends controller error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // check if a req already exists
    const existingRequest = await FriendRequestModal.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({
          message: "A friend request already exists between you and this user",
        });
    }

    const friendRequest = await FriendRequestModal.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequestModal.findById(requestId);
    if (!friendRequest) {
      return res.status(401).json({ message: "Friend request not Found" });
    }

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // $addToSet add to the array if not exist already
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });
  } catch (error) {
    console.log("sendRequest controller error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriendRequestDetails = async (req, res) => {
  try {
    const incomingRequests = await FriendRequestModal.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profileImage nativeLanguage learningLanguage"
    );

    const acceptRequests = await FriendRequestModal.find({
      sender: req.user.id,
      status: "accepted",
    }).populate(
      "recipient",
      "fullName profileImage nativeLanguage learningLanguage"
    );

    res.status(200).json({ success: true, incomingRequests, acceptRequests });
  } catch (error) {
    console.log("getFriendRequestDetails controller error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOutgoingRequest = async (req, res) => {
  try {
    const outgoingRequests = await FriendRequestModal.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profileImage nativeLanguage learningLanguage"
    );
    res.status(200).json({ success: true, outgoingRequests });
  } catch (error) {
    console.log("getFriendRequestDetails controller error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
