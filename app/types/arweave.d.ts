declare global {
    interface Window {
        arweaveWallet: {
            connect: (permissions: string[]) => Promise<void>;
            getPermissions: () => Promise<string[]>;
            getActiveAddress: () => Promise<string>;
            disconnect: () => Promise<void>;
            signTransaction: (transaction: any) => Promise<any>;
            // Add other methods you might need
        };
    }
}

export { };  // This is important - it ensures this is treated as a module