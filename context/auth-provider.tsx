import React, { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { saveTokensOnCookies } from "@/lib/utils/save-cookies";
import toast from "react-hot-toast";
import { Profile } from "@/store/use-user-store";
import { Loader } from "lucide-react";
import { parseJwt } from "@/lib/api/api-utils";
import apiClient from "@/lib/api/api-client";
import { clearCache } from "@/lib/utils/clear-cache";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  isAuthenticated: boolean;
  user?: Profile;
  roles: string[];
  loading: boolean;
  fetchUserProfile: (s: string) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Profile | undefined>(undefined);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;
  const router = useRouter();

  const fetchUserProfile = useCallback(async (token: string) => {

    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    const { sub, resource_access } = parseJwt(token);

    try {
      const { data } = await apiClient.get(`/v1/me`);

      // var roles = resource_access['robin-ui'].roles;

      const profile: Profile = {
        userId: sub,
        profileId: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        roles: [],
      };
      setUser(profile);
      setRoles(roles);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      signOut();
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      fetchUserProfile(token);
    } else {
      setIsLoading(false);
    }
  }, [fetchUserProfile]);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://auth.skndan.com:8443/realms/robin-realm/protocol/openid-connect/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: "robin-ui",
              grant_type: "password",
              username: email,
              password: password,
            }).toString(),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch token: ${response.statusText}`);
        }

        const data = await response.json();

        const { access_token, refresh_token } = data;

        const { exp } = parseJwt(access_token);

        saveTokensOnCookies(access_token, refresh_token, exp);

        apiClient.defaults.headers["Authorization"] = `Bearer ${access_token}`;

        await fetchUserProfile(access_token);

        toast.success("Welcome!");
        router.push("/dashboard");
      } catch (error) {
        console.error("Sign-in error:", error);
        toast.error("Failed to sign in. Please check your credentials.");
        setIsLoading(false);
      }
    },
    [fetchUserProfile, router]
  );

  const signOut = useCallback(() => {
    setUser(undefined);
    setRoles([]);
    clearCache();
    router.push("/");
  }, [router]);

  // if (isLoading) {
  //   return (
  //     <div className="grid h-screen place-items-center bg-background z-40">
  //       <Loader className="animate-spin h-6 w-6 text-gray-500" />
  //     </div>
  //   );
  // }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, user, roles, loading: isLoading, fetchUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
