import React, { useState, useEffect } from "react";
import {
  Page,
  Form,
  Card,
  Button,
  SkeletonPage,
  Layout,
  SkeletonBodyText,
  ProgressBar,
} from "@shopify/polaris";
import {
  useSubmit,
  useLoaderData,
  useFetcher,
  useActionData,
} from "@remix-run/react";
import { shopifyLoader, redirectBro } from "../loaders/shopifyLoader";

export async function loader({ request }) {

  // const url = new URL(request.url);
  // const shop = url.searchParams.get("shop");
  // if (!shop) {
  //   return redirect(`/auth?shop=${shop}`);
  // }

  let temp = await shopifyLoader(request);
  return temp;
}

export async function action({ request }) {
  console.log("entered the action function");
  let formData = await request.formData();
  let { _action, value, ShopID, ShopName, AccessToken } = Object.fromEntries(formData);
  console.log(`ShopID: ${ShopID}`);
  console.log(`ShopName: ${ShopName}`);
  console.log(`AccessToken: ${AccessToken}`);
  console.log(`_action: ${_action}`);

  if (_action === "Customers") {
  }
  else if (_action === "Orders") {
  }
  else if (_action === "BulkProducts") {
  }
  else if (_action === "Authorize") {
    console.log(`before redirect`);
    let linnk = `https://golf-dev.xpos.co.uk/ShopifyAuthentication/${ShopName}/${AccessToken}`;
    console.log(`linnk: ${linnk}`);
    return redirectBro(request, linnk);
  }
  else if (_action === "Unlink") {
    const unlinkUrl = `https://golf-dev.xpos.co.uk/api/shopify/UnlinkShop?shop=${ShopName}&shopid=${ShopID}`;
    console.log(`unlinkUrl: ${unlinkUrl}`);
    try {

      const unlinkRequest = await fetch(unlinkUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (unlinkRequest.ok) {
      }
      else {
        console.log(`xposAuthApi: ${unlinkRequest.status}`);
        throw new Error("Network response was not ok");
      }
    }
    catch (error) {
      console.log(`There was a problem with the request: ${error}`);
    }
  }
  console.log("executed the action function");
  return null;
}

export default function sync() {
  let loaderData = useLoaderData();
  let actionData = useActionData();
  let fetcher = useFetcher();

  if (loaderData.HasAccess) {
    return (
      <SkeletonPage title="Connected to Crossover Technologies">
        <ui-title-bar title={"Main Page"}></ui-title-bar>
        <Layout>
          <Layout.Section>
            <Card>
              <fetcher.Form method="POST">
                <input type="hidden" name="ShopID" value={loaderData.ShopID} />
                <input type="hidden" name="ShopName" value={loaderData.ShopName} />
                <input type="hidden" name="AccessToken" value={loaderData.AccessToken} />
                <span>You are connected to shop {loaderData.ShopID}</span><br></br>
                <button type="submit" name="_action" aria-label="Unlink" value="Unlink">
                  Unlink
                </button>
              </fetcher.Form>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  } else
    return (
      <Page>
        <ui-title-bar title={"Main Page"}></ui-title-bar>
        <Card>
          <fetcher.Form method="POST">
            <h3>Please Authorize with Xpos</h3>
            <ul>
              <li>
                {" "}
                <input type="hidden" name="ShopID" value={loaderData.ShopID} />
                <input type="hidden" name="ShopName" value={loaderData.ShopName} />
                <input type="hidden" name="AccessToken" value={loaderData.AccessToken} />
                <input type="hidden" name="hiddenBTN" />
                <button type="submit" name="_action" aria-label="Authorize" value="Authorize">
                  Authorize with Xpos
                </button>
              </li>
            </ul>
          </fetcher.Form>
        </Card>
      </Page>
    );
}