import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import styled, { keyframes } from 'styled-components';

interface Props {}

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Add the loader component */}
          <Loader />
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

const beat = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: url('/logo.png') no-repeat center;
  background-size: contain;
  animation: ${beat} 1s linear infinite;
`;

export default MyDocument;