import { execSync } from "child_process";
import { join } from "path";

import { loadEnvs } from "../config/env";
loadEnvs();

function getRover() {
  return join("node_modules", ".bin", "rover");
}

execSync(
  `APOLLO_KEY=${process.env.APOLLO_KEY} ${getRover()} subgraph publish ${
    process.env.APOLLO_GRAPH_REF
  } --schema ./subgraph/subgraph.graphql --routing-url http://localhost:${
    process.env.PORT
  }/graphql --name pick-a-rick --convert`
);
