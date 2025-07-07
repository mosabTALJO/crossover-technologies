import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  ScrollRestoration,
} from "@remix-run/react";

import { json } from '@remix-run/node';

import { ShopifyAppProvider } from "@shopify/shopify-app-remix";

export async function loader({ request }) {
  const url = new URL(request.url);
  return json({
    shop: url.searchParams.get("shop"),
    host: url.searchParams.get("host"),
  });
}

export default function App() {
  const { shop, host } = useLoaderData();

  return (
    <ShopifyAppProvider shop={shop} host={host}>
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
    </ShopifyAppProvider>
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