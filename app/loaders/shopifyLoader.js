import { authenticate } from "../shopify.server";

export async function shopifyLoader(request) {
    console.log("******************");
    console.log("shopifyLoader start");

    const { session } = await authenticate.admin(request);

    try{
        const url = new URL(request.url);
        const shop = url.searchParams.get("shop");
        if (!session || !shop) {
            return redirect(`/auth?shop=${shop}`);
        }
    }
    catch(error){
        console.log(`************shit: ${error}`);
    }

    let shopName = session.shop.split('.')[0];
    const AuthEndpoint = `https://golf-dev.xpos.co.uk/api/shopify/StoreAuth?shopName=${shopName}`;
    let hasAccess = false;
    let shopid = "";
    try {
        const xposAuthRequest = await fetch(AuthEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!xposAuthRequest.ok) {
            console.log(`xposAuthApi: ${xposAuthRequest.status}`);
            throw new Error("Network response was not ok");
        }
        const xposAuthApiResponse = await xposAuthRequest.json();
        shopid = xposAuthApiResponse.ShopId;
        if (!shopid || shopid.length === 0) {
            throw new Error("No shopid!!!");
        }
        hasAccess = true;
        console.log(`xposAuthApi response Has Access = ${shopid}`);
    } catch (error) {
        console.log(`There was a problem with the request: ${error}`);
    }

    console.log("end of loader");
    console.log("******************");
    return Response.json({ HasAccess: hasAccess, ShopID: shopid, AccessToken: session.accessToken, ShopName: shopName });
}

export async function redirectBro(request, url) {
    console.log("******************");
    console.log("redirectBro start");
    const { redirect } = await authenticate.admin(request);
    return redirect(url, { target: "_parent" });
}