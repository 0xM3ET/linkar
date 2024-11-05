// utils/fetchProtocolLandId.ts
interface Tag {
    name: string;
    value: string;
}

interface TransactionEdge {
    node: {
        id: string;
        tags: Tag[];
    };
}

interface FetchProtocolLandIdResponse {
    data: {
        transactions: {
            edges: TransactionEdge[];
        };
    };
}

export async function fetchProtocolLandId(): Promise<string | null> {
    try {
        // Check if ArConnect is available
        if (typeof window === "undefined" || typeof window.arweaveWallet === "undefined") {
            throw new Error("ArConnect is not installed. Please install it to continue.");
        }

        // Request permissions if needed
        await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGNATURE"]);

        // Get the wallet address
        const walletAddress = await window.arweaveWallet.getActiveAddress();

        // GraphQL query to fetch protocol.land ID
        const query = {
            query: `
          query($walletAddress: String!) {
            transactions(
              owners: [$walletAddress],
              tags: [
                { name: "App-Name", values: ["ProtocolLandApp"] },
                { name: "protocol.land-id" }
              ]
            ) {
              edges {
                node {
                  id
                  tags {
                    name
                    value
                  }
                }
              }
            }
          }
        `,
            variables: { walletAddress }
        };

        const response = await fetch("https://arweave.net/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query),
        });

        const data: FetchProtocolLandIdResponse = await response.json();
        const transactions = data.data.transactions.edges;

        if (transactions.length === 0) {
            console.log("No protocol.land ID found for this wallet.");
            return null;
        }

        // Extract protocol.land ID from tags
        const protocolLandTag = transactions[0].node.tags.find(
            tag => tag.name === "protocol.land-id"
        );

        return protocolLandTag ? protocolLandTag.value : null;
    } catch (error) {
        console.error("Error fetching protocol.land ID:", error);
        return null;
    }
}
