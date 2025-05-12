import { AxiosPromise } from "axios";
import apiClient from "../client";
import { abortableRequest } from "../utils";
import { SearchedUser, UserWithId } from "./types";

export const searchUsers = (query: string): AxiosPromise<SearchedUser[]> =>
  apiClient.get("/user/search", { params: { q: query } });

// export const searchUsers = (query: string) => ({
//   data: [
//     {
//       email: "tomercpc01@gmail.com",
//       username: "tomer shomron",
//     },
//     {
//       email: "arielhahomo@gmail.com",
//       username: "ariel ohana",
//     },
//     {
//       email: "yuvalgay@gmail.com",
//       username: "yuval rechev",
//     },
//   ] satisfies SearchedUser[],
// });

export const getFriends = () =>
  abortableRequest((abortController) =>
    apiClient.get<UserWithId[]>("/user/friend", { signal: abortController.signal })
  );

export const getFriendsRequest = () =>
  abortableRequest((abortController) =>
    apiClient.get<UserWithId[]>("/user/friend/requests", {
      signal: abortController.signal,
    })
  );

const respondFriendRequest = (userId: string, respond: boolean) =>
  apiClient.put("/user/friend/answer", {
    friendRequester: userId,
    accepted: respond,
  });

export const acceptFriendRequest = (userId: string) =>
  respondFriendRequest(userId, true);

export const declineFriendRequest = (userId: string) =>
  respondFriendRequest(userId, false);


// const fetchFriends = (): Promise<{ data: User[] }> =>
//   Promise.resolve({
//     data: [
//       {
//         email: "tomercpc01@gmail.com",
//         username: "Lilia Hazan",
//         statistics: {
//           streak: 5,
//           xp: 10,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "Or Malawi",
//         statistics: {
//           streak: 5,
//           xp: 12345,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },

//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//     ],
//   });
  
// const fetchPendingFriendsRequest = (): Promise<{ data: User[] }> =>
//   Promise.resolve({
//     data: [
//       {
//         email: "tomercpc01@gmail.com",
//         username: "tomer",
//         statistics: {
//           streak: 0,
//           xp: 0,
//         },
//       },
//     ],
//   });