import { ASTNode, print } from "graphql";
import * as fs from "fs";
import * as path from "path";

export const getGraphQLSchema = () => {
  const schemasPath = path.resolve("graphql");

  return fs
    .readdirSync(schemasPath)
    .map((file) => fs.readFileSync(`${schemasPath}/${file}`, "utf8"))
    .join("\n");
};

export const createSubgraph = (typeDefs: ASTNode) => {
  const filePath = path.resolve("subgraph", "subgraph.graphql");
  const dirName = path.dirname(filePath);
  const printedTypeDefs = print(typeDefs);

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }

  fs.writeFileSync(filePath, printedTypeDefs, { encoding: "utf8", flag: "w" });
};
