import { ASTNode, print } from "graphql";
import * as fs from "fs";
import * as path from "path";

export const createSubgraph = (typeDefs: ASTNode) => {
  const filePath = path.resolve("subgraph", "subgraph.graphql");
  const dirName = path.dirname(filePath);
  const printedTypeDefs = print(typeDefs);

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }

  fs.writeFileSync(filePath, printedTypeDefs, { encoding: "utf8", flag: "w" });
};

export const getGraphQLSchema = () => {
  const dir = path.resolve("graphql");

  return fs
    .readdirSync(dir)
    .map((file) => fs.readFileSync(`${dir}/${file}`, "utf8"))
    .join("\n");
};
