import { fetch, FetchMethods, FetchResultTypes } from "@sapphire/fetch";

interface HastebinResponse {
  key: string;
}

export async function postHaste(result: string, language = "ts") {
  const hastebinUrl = "https://hst.sh";
  const { key } = await fetch<HastebinResponse>(
    `${hastebinUrl}/documents`,
    {
      method: FetchMethods.Post,
      body: result,
    },
    FetchResultTypes.JSON
  );
  return `${hastebinUrl}/${key}.${language}`;
}
