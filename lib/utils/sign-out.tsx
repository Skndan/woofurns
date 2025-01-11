import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { destroyCookie } from "nookies";

export function clearCookie(ctx?: GetServerSidePropsContext) {
  destroyCookie(ctx, "nextauth.token");
  destroyCookie(ctx, "nextauth.refreshToken"); 
}