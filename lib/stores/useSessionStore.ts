import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import apiRequest from "../apiRequest";
import { LoginSchemaType, RegisterSchemaType } from "../schemas/AuthSchema";
import { ApiResponse } from "@/types/api-response";
import { UserData } from "@/types/user";

export type AuthResponse<T> = {
  error: boolean;
  message: string;
  data?: T;
};

export type Session = {
  token: string;
  user: UserData;
};

export type UseSessionStore = {
  isLoading: boolean;
  session: Session | null;
  register: (body: RegisterSchemaType) => Promise<AuthResponse<UserData>>;
  login: (body: LoginSchemaType) => Promise<AuthResponse<UserData>>;
  logout: (token: string) => Promise<AuthResponse<UserData>>;
};

const getUserInfoByAccessToken = async (access_token: string) => {
  const gettingUserInfoRes = await apiRequest.get("/me", access_token);
  const gettingUserInfoResult =
    (await gettingUserInfoRes.json()) as ApiResponse<UserData>;
  if (!gettingUserInfoResult.success) {
    throw new Error(
      gettingUserInfoResult.message ||
        "Terjadi kesalahan. Coba lagi beberapa saat!"
    );
  }
  return gettingUserInfoResult;
};

const useSessionStore = create(
  persist<UseSessionStore>(
    (set) => ({
      isLoading: false,
      session: null,
      register: async (body) => {
        try {
          set((prevState) => ({ ...prevState, isLoading: true }));
          const registerRes = await apiRequest.post("/register", body);
          const registerResult = (await registerRes.json()) as ApiResponse<{
            access_token: string;
          }>;
          if (!registerResult.success) {
            throw new Error(
              registerResult.message ||
                "Terjadi kesalahan. Coba lagi beberapa saat!"
            );
          }
          const { access_token } = registerResult.data;

          const gettingUserInfoResult = await getUserInfoByAccessToken(
            access_token
          );

          set((prev) => ({
            ...prev,
            session: { token: access_token, user: gettingUserInfoResult.data },
          }));
          return {
            error: false,
            message: "OK",
            data: gettingUserInfoResult.data,
          };
        } catch (error) {
          console.log(error);
          const { message } = error as Error;
          return { error: true, message };
        } finally {
          set((prev) => ({ ...prev, isLoading: false }));
        }
      },
      login: async (body) => {
        try {
          set((prevState) => ({ ...prevState, isLoading: true }));
          const loginRes = await apiRequest.post("/login", body);
          const loginResult = (await loginRes.json()) as ApiResponse<{
            access_token: string;
          }>;
          if (!loginResult.success) {
            throw new Error(
              loginResult.message ||
                "Terjadi kesalahan. Coba lagi beberapa saat!"
            );
          }
          const { access_token } = loginResult.data;
          const gettingUserInfoResult = await getUserInfoByAccessToken(
            access_token
          );
          set((prev) => ({
            ...prev,
            session: { token: access_token, user: gettingUserInfoResult.data },
          }));
          return {
            error: false,
            message: "OK",
            data: gettingUserInfoResult.data,
          };
        } catch (error) {
          console.log(error);
          const { message } = error as Error;
          return { error: true, message };
        } finally {
          set((prev) => ({ ...prev, isLoading: false }));
        }
      },
      logout: async (token) => {
        try {
          set((prevState) => ({ ...prevState, isLoading: true }));
          await apiRequest.post("/logout", undefined, token);
          set((prev) => ({ ...prev, session: null }));
          return { error: false, message: "OK" };
        } catch (error) {
          const { message } = error as Error;
          return { error: true, message };
        } finally {
          set((prev) => ({ ...prev, isLoading: false }));
        }
      },
    }),
    { name: "session", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export default useSessionStore;
