import reservationResolvers from "./reservation";
import { GraphQLDateTime } from "graphql-iso-date";

const customScalarResolver = { Date: GraphQLDateTime };

export default [customScalarResolver, reservationResolvers];
