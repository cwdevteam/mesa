import getIpfsLink from "./getIpfsLink";

const fetchUri = async (uri: string) => {
    try {
        if (uri && uri.startsWith("ipfs://")) {
          const ipfsUrl = await getIpfsLink(uri);
          const response = await fetch(ipfsUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
          }
          return await response.json();
        }
    } catch (error) {
        console.error("Failed to fetch IPFS link:", error);
        return uri
    }
}

export default fetchUri