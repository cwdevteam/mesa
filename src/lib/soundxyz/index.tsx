import { SoundAPI } from "@soundxyz/sdk/api/sound";

const apiKey = process.env.SOUNDXYZ_API_KEY;

if (!apiKey) throw Error("Missing sound API key");

export const soundAPI = SoundAPI({
  apiKey,
});
