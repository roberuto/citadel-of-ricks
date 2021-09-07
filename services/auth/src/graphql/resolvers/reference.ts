import { getUserReferenceQuery } from "../../app/features/users/graphql/queries/get-user.query";

export const resolveReference = {
  User: {
    __resolveReference: getUserReferenceQuery,
  },
};
