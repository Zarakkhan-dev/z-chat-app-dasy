import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UseFetchQuery, postQueryWithUrl } from "../lib/api";
import {
  FRIENDS_URL,
  OUTGOING_FRIEND_REQUESTS_URL,
  RECOMMENDED_USERS_URL,
  SEND_FRIENDS_REQUEST_URL,
} from "../lib/config";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { Link } from "react-router";
import FriendCard from "../component/FriendCard";
import NoFriendsFound from "../component/NoFriendsFound";
import NoRecommendationUserFound from "../component/NoRecommendationUserFound";
import { capitialize } from "../lib/Utils";
import GetLanguageFlag from "../component/GetLanguageFlag";

const HomePage = () => {
  const queryClient = useQueryClient();

  const [outgoingRequestsId, setOutgoingRequestsId] = useState<any[]>([
    new Set(),
  ]);

  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: () => {
      return UseFetchQuery(FRIENDS_URL);
    },
  });

  const { data: recommendedUser = [], isLoading: recommendedUsersLoading } =
    useQuery({
      queryKey: ["recommendedUsers"],
      queryFn: () => {
        return UseFetchQuery(RECOMMENDED_USERS_URL);
      },
    });
  const { data: outgoingFriendRequest = [] } = useQuery({
    queryKey: ["outgoingFriendRequest"],
    queryFn: () => {
      return UseFetchQuery(OUTGOING_FRIEND_REQUESTS_URL);
    },
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: ({ url }: { url: string }) => postQueryWithUrl(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendRequest"] });
    },
  });

  useEffect(() => {
    const outgoingRequestId = new Set();
    if (outgoingFriendRequest?.success) {
      if (outgoingFriendRequest.outgoingRequests.length > 0) {
        outgoingFriendRequest?.outgoingRequests.forEach((request: any) => {
          outgoingRequestId.add(request?.recipient?._id);
        });
        setOutgoingRequestsId(Array.from(outgoingRequestId));
      }
    }
  }, [outgoingFriendRequest]);

 friends?.friendList?.friends.map((friend:any) => {
    console.log(friend)
  })
  return (
    <>
      <div className="p-4 sm:pm-6 lg:p-8">
        <div className="container mx-auto sapce-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Your Friends
            </h2>
            <Link to="/notification" className="btn btn-outline btn-sm">
              <UserIcon className="mr-2 size-4" />
              Friends Requests
            </Link>
          </div>

          {friendsLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : friends && friends?.friendList?.friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-9">
              {
                 friends.friendList.friends.map((friend: any) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
            </div>
          )}

          <section className="mt-8">
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Meet New Learners
                  </h2>
                  <p className="opacity-70">
                    {" "}
                    Discover Perfect language exchange partners based on your
                    profile
                  </p>
                </div>
              </div>
            </div>

            {recommendedUsersLoading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : recommendedUser.length === 0 ? (
              <NoRecommendationUserFound />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recommendedUser &&
                  recommendedUser?.recommendedUsers.length > 0 &&
                  recommendedUser?.recommendedUsers?.map(
                    (user: any, index: number) => {
                      const hasRequestBeenSent = outgoingRequestsId.includes(
                        user._id.toString()
                      );
                      return (
                        <div
                          key={index}
                          className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="card-body p-5 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="avatar size-16 rounded-full">
                                <img
                                  src={user.profileImage}
                                  alt={user.fullName}
                                />
                              </div>

                              <div>
                                <h3 className="font-semibold text-lg">
                                  {user.fullName}
                                </h3>
                                {user.location && (
                                  <div className="flex items-center text-xs opacity-70 mt-1">
                                    <MapPinIcon className="size-3 mr-1" />
                                    {user.location}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Languages with flags */}
                            <div className="flex flex-wrap gap-1.5">
                              <span className="badge badge-secondary">
                                {GetLanguageFlag(user.nativeLanguage)}
                                Native: {capitialize(user.nativeLanguage)}
                              </span>
                              <span className="badge badge-outline">
                                {GetLanguageFlag(user.learningLanguage)}
                                Learning: {capitialize(user.learningLanguage)}
                              </span>
                            </div>

                            {user.bio && (
                              <p className="text-sm opacity-70">{user.bio}</p>
                            )}

                            {/* Action button */}
                            <button
                              className={`btn w-full mt-2 ${
                                hasRequestBeenSent
                                  ? "btn-disabled"
                                  : "btn-primary"
                              } `}
                              onClick={() =>
                                sendRequestMutation({
                                  url: `${SEND_FRIENDS_REQUEST_URL}/${user._id}`,
                                })
                              }
                              disabled={hasRequestBeenSent || isPending}
                            >
                              {hasRequestBeenSent ? (
                                <>
                                  <CheckCircleIcon className="size-4 mr-2" />
                                  Request Sent
                                </>
                              ) : (
                                <>
                                  <UserPlusIcon className="size-4 mr-2" />
                                  Send Friend Request
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
