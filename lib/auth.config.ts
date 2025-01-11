// import axios from 'axios';
// import { NextAuthConfig } from 'next-auth';
// import CredentialProvider from 'next-auth/providers/credentials';
// import GithubProvider from 'next-auth/providers/github';

// const authConfig = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? '',
//       clientSecret: process.env.GITHUB_SECRET ?? ''
//     }),
//     CredentialProvider({
//       credentials: {
//         email: {
//           type: 'email'
//         },
//         password: {
//           type: 'password'
//         }
//       },
//       async authorize(credentials: any, req) {
//         try {
//           console.log(`${process.env.KEYCLOAK_TOKEN_URL}`);
//           const tokenResponse = await axios.post(
//             `${process.env.KEYCLOAK_TOKEN_URL}`,
//             new URLSearchParams({
//               grant_type: 'password',
//               client_id: process.env.KEYCLOAK_CLIENT_ID ?? 'robin-ui',
//               username: credentials.email,
//               password: credentials.password,
//             }),
//             { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//           );
//           console.log(tokenResponse.data);
//           const response = await axios.get(
//             `http://localhost:8080/api/v1/me`,
//             { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenResponse.data.access_token}` } }
//           );
//           console.log(response.data);
//           const user = {
//             id: response.data.profileId,
//             ...response.data,
//             accessToken: tokenResponse.data.access_token,
//             refreshToken: tokenResponse.data.refresh_token,
//           };
//           return user;
//         } catch (error) {
//           return null;
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: '/' //sigin page
//   }
// } satisfies NextAuthConfig;

// export default authConfig;
