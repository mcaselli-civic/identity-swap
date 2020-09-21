import { clusterApiUrl, Commitment, Connection } from "@solana/web3.js";
import { identity, memoizeWith } from "ramda";
import { ExtendedCluster } from "../../utils/types";

const LOCALNET_URL = "http://localhost:8899";

// The default time to wait when confirming a transaction.
export const DEFAULT_COMMITMENT: Commitment = "max";

// Since connection objects include state, we memoise them here per network
const createConnection = memoizeWith<(network: string) => Connection>(
  identity,
  (network) => new Connection(network)
);

export const getNetwork = (cluster: ExtendedCluster): string =>
  cluster === "localnet" ? LOCALNET_URL : clusterApiUrl(cluster);

export const getConnection = (cluster: ExtendedCluster): Connection => {
  const network = getNetwork(cluster);
  return createConnection(network);
};