import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import { fetchUserPayload, FetchUserPayloadAction } from "../../actions/user";

interface LayoutProps {
  children: JSX.Element;
  fetchUserPayload: () => Promise<FetchUserPayloadAction>;
}

const Layout = (props: LayoutProps) => {
  props.fetchUserPayload();
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};

export default connect(null, { fetchUserPayload })(Layout);
