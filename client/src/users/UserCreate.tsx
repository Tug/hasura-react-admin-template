import * as React from "react";
import { Create, SelectInput, SimpleForm, TextInput } from "react-admin";
//import { Roles } from "../../shared/types";

const choices = [].map((r) => ({
  id: r,
  name: r
}));

type Props = {

};
export default (props: Props): JSX.Element => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="account.email" />
      <TextInput source="account.password" type="password" />
      <TextInput source="account.firstName" />
      <TextInput source="account.lastName" />
      <SelectInput source="role" choices={choices} />
    </SimpleForm>
  </Create>
);
