import { GetServerSidePropsContext } from "next";
import Cookies from "next-cookies-universal";
import { setCookie } from "nookies"; 

export function saveTokensOnCookies(
  token: string,
  refreshToken: string,
  exp: string,
  ctx?: GetServerSidePropsContext
) { 

  setCookie(ctx, "nextauth.token", token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    secure: true,
    sameSite: 'Strict'
  });

  setCookie(ctx, "nextauth.refreshToken", refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    secure: true,
    sameSite: 'Strict'
  });

  setCookie(ctx, "nextauth.exp", exp, {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: "/",
  });

}
