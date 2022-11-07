import Document, { Html, Head, Main, NextScript } from "next/document";
import { Global, css } from '@emotion/react';

export default class CustomDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="stylesheet preload prefetch"
                        href="/fonts/GTAmericaCompressedRegular.woff"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous" />
                    <link rel="stylesheet preload prefetch"
                        href="/fonts/GTAmericaCompressedBold.woff"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous" />
                    <link rel="stylesheet preload prefetch"
                        href="/fonts/GTAmericaStandardRegular.woff"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous" />
                    <link rel="stylesheet preload prefetch"
                        href="/fonts/GTAmericaStandardBold.woff"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous" />
                </Head>
                <Global styles={css`
                    @font-face {
                        font-family: 'GTAmericaCompressedRegular';
                        src: url('/fonts/GTAmericaCompressedRegular.woff') format('woff'),
                        url('/fonts/GTAmericaCompressedRegular.ttf') format('truetype');
                        font-display: swap;
                    }
                    @font-face {
                        font-family: 'GTAmericaCompressedBold';
                        src: url('/fonts/GTAmericaCompressedBold.woff') format('woff'),
                        url('/fonts/GTAmericaCompressedBold.ttf') format('truetype');
                        font-display: swap;
                    }
                    @font-face {
                        font-family: 'GTAmericaStandardRegular';
                        src: url('/fonts/GTAmericaStandardRegular.woff') format('woff'),
                        url('/fonts/GTAmericaStandardRegular.ttf') format('truetype');
                        font-display: swap;
                    }
                    @font-face {
                        font-family: 'GTAmericaStandardBold';
                        src: url('/fonts/GTAmericaStandardBold.woff') format('woff'),
                        url('/fonts/GTAmericaStandardBold.ttf') format('truetype');
                        font-display: swap;
                    }
                    html, body {
                        width: 100vw;
                        margin: 0 auto;
                        font-size: 15;
                        font-family: GTAmericaStandardRegular, GTAmericaCompressedRegular, helvetica;
                    }

                    svg path {
                        transition: fill ease .5s;
                    }
                `} />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}



