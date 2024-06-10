import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { NextUIProvider } from "@nextui-org/react";

import styles from "~/style.css";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import { Toaster } from "react-hot-toast";
import { FlashSessionInterface, getFlashSession } from "./flash-session";
import { useEffect } from "react";

export default function App() {
 
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <Outlet />
        </NextUIProvider>
        <Toaster position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const flashSession = await getFlashSession(request.headers.get("Cookie"));
  const alert = flashSession || {};

  return { flashSessionx: alert.data.__flash_alert__ };
};
