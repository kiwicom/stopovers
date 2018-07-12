import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: blue;
  font-size: 50px;
`;

const Layout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

export default () => (
  <Layout>
    <Title>Stopovers</Title>
  </Layout>
);
