import axios from "axios";
export function chatServices(data) {
  return axios("/getAllUsers", {
    method: "GET",
    data: data
  });
}
export function userChatArray(data) {
  return axios("/getAllChats", {
    method: "GET",
    data: data
  });
}
