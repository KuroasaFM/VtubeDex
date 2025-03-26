// import { ApiClient } from "twitch";
// import { StaticAuthProvider } from "twitch-auth";
//
//
const TWITCH_CLIENT_ID = "xpptrtzkva6yjtqv3t0tzmkkar68dy";
const TWITCH_CLIENT_SECRET = "7kd8zxkppm5z5ds99drp9x66eggnv5";
//
// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
// const authProvider = new StaticAuthProvider(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET);
// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
// export const apiClient = new ApiClient({ authProvider });
//
//

import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { data: token } = await axios.post(
  "https://id.twitch.tv/oauth2/token",
  {
    client_id: TWITCH_CLIENT_ID,
    client_secret: TWITCH_CLIENT_SECRET,
    grant_type: "client_credentials",
  },
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
);

const twitch = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Authorization: `Bearer ${token.access_token}`,
    "Client-Id": TWITCH_CLIENT_ID,
  },
});

export default twitch;
