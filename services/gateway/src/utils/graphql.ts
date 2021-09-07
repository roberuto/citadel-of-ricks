import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

import { isProd, isFederationManaged } from "./envoronment";

type SupergraphConfig = {
  subgraphs: {
    routing_url: string;
    schema: {
      file: string;
    };
  };
};

export const getSubgraphs = () => {
  if (isFederationManaged()) {
    return {};
  }

  if (isProd()) {
    const supergraphPath = path.resolve("supergraph.graphql");
    const supergraphSdl = fs.readFileSync(supergraphPath, "utf8").toString();

    return { supergraphSdl };
  }

  const supergraphConfig = path.resolve("supergraph.yaml");
  const doc = yaml.load(fs.readFileSync(supergraphConfig, "utf8")) as SupergraphConfig;

  // @ts-ignore
  const serviceList = Object.entries(doc.subgraphs).map(([key, value]) => ({ name: key, url: value.routing_url }));

  return { serviceList };
};
