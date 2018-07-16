// @flow
import * as React from "react";
import styled from "styled-components";

import Hero from "../components/hero/Hero";

const Layout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const Index = () => (
  <Layout>
    <Hero />
  </Layout>
);

export default Index;
