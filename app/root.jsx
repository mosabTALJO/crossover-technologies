import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  ScrollRestoration,
} from "@remix-run/react";

import { json } from '@remix-run/node';
// import {authenticate} from '~/shopify.server';
import {AppProvider} from '@shopify/shopify-app-remix/react';

export async function loader({ request }) {
  // const url = new URL(request.url);
  // return json({
  //   shop: url.searchParams.get("shop"),
  //   host: url.searchParams.get("host"),
  // });
  // await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY });
}

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
    </AppProvider>
  );
}

// export default function App() {
//   const { shop, host } = useLoaderData<typeof loader>();
//   return (
//     <html>
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width,initial-scale=1" />
//         <link rel="preconnect" href="https://cdn.shopify.com/" />
//         <link
//           rel="stylesheet"
//           href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
//         />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <Outlet />
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }