import gql from 'graphql-tag';

export const GET_JOB = gql`
  {
    id
    creator_id
    model_id
    name
    params
    started_at
    ended_at
    created_at
    type {
      value
    }
    status {
      value
    }
  }
`;
