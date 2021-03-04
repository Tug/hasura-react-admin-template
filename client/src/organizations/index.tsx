import * as React from "react";
import { EditGuesser } from "react-admin";
import Business from "@material-ui/icons/Business";

import OrganizationList from "./OrganizationList";

export default {
  list: OrganizationList,
  edit: EditGuesser,
  icon: Business,
};
