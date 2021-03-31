import { GET_ONE, GET_LIST, UPDATE } from 'react-admin';
import { ResourceType, FetchType, buildFields } from 'ra-data-hasura';

import { GET_USER } from './queries/users';
import { GET_JOB } from './queries/jobs';
import { GET_ORGANIZATION } from "./queries/organizations";
import { GET_MODEL } from "./queries/models";

/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst: any) =>
	queryAst.definitions[0].selectionSet.selections;

// An object of all the custom queries we have defined.
const CUSTOM_QUERIES: any = {
	users: {
		[GET_ONE]: GET_USER,
		[GET_LIST]: GET_USER,
		[UPDATE]: GET_USER,
	},
	models: {
		[GET_ONE]: GET_MODEL,
		[GET_LIST]: GET_MODEL,
	},
	jobs: {
		[GET_ONE]: GET_JOB,
		[GET_LIST]: GET_JOB,
	},
	organizations: {
		[GET_ONE]: GET_ORGANIZATION,
		[GET_LIST]: GET_ORGANIZATION,
	}
};

// Function which defines query overrides for specific resources/fetchTypes.
const customBuildFields = (type: ResourceType, fetchType: FetchType) => {
	const resourceName: string = type.name;

	// First check if the resource has any custom queries defined.
	const resourceCustomQueries = CUSTOM_QUERIES[resourceName];

	// If this specific query i.e. resource and fetchType has a custom query, extract the fields from it.
	if (resourceCustomQueries && resourceCustomQueries[fetchType]) {
		return extractFieldsFromQuery(resourceCustomQueries[fetchType]);
	}

	// No custom query defined, so use the default query fields (all, but none related/nested).
	return buildFields(type);
};

export default customBuildFields;
