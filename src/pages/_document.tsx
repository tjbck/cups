import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head >
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet" />

                <meta
                    name="description"
                    content="Fastcups allows you to stay in sync with your students while you teach."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}