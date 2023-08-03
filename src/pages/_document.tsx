import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';


class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='fr' title='Emmaüs Chatellerault - Naintré - Boutique en ligne pour vendre les livres Rares , Anciens , les Beaux Livres , lex BDs , Les Livres de collections , les Objects de Collections ... a un prix compététif'>
        <Head />
        <body>      
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}





export default MyDocument;