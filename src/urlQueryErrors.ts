import queryString from "querystring";
import { toast } from "react-toastify";

export default function showUrlQueryError() {
  const query = queryString.parse(window.location.search.substring(1));
  switch (query.error) {
    case "loginGoogle":
      toast.error(query.msg, { containerId: "global" });
      return;
    case "signupGoogle":
      toast.error(query.msg, { containerId: "global" });
  }
}
