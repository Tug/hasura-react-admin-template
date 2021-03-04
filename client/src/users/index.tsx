import * as React from "react";
import { EditGuesser, ListGuesser } from "react-admin";
import UserCreate from "./UserCreate";
import UserList from "./UserList";
import UserEdit from "./UserEdit";
import PeopleIcon from "@material-ui/icons/People";

export default {
  list: UserList,
  edit: UserEdit,
  create: UserCreate,
  icon: PeopleIcon,
};
