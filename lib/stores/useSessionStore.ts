import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import apiRequest from "../apiRequest";
import { LoginSchemaType, RegisterSchemaType } from "../schemas/AuthSchema";
import { ApiResponse } from "@/types/api-response";
import { UserData } from "@/types/user";

export type AuthResponse = {
  error: boolean;
  message: string;
};

export type Session = {
  token: string;
  user: UserData;
};

export type UseSessionStore = {
  isLoading: boolean;
  session: Session | null;
  register: (body: RegisterSchemaType) => Promise<AuthResponse>;
  login: (body: LoginSchemaType) => Promise<AuthResponse>;
  logout: (token: string) => Promise<AuthResponse>;
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
          console.log({ token: registerResult.data.access_token });
          const { access_token } = registerResult.data;
          const gettingUserInfoRes = await apiRequest.get("/me", access_token);
          const gettingUserInfoResult =
            (await gettingUserInfoRes.json()) as ApiResponse<UserData>;
          console.log(gettingUserInfoResult.data);
          set((prev) => ({
            ...prev,
            session: { token: access_token, user: gettingUserInfoResult.data },
          }));
          return { error: false, message: "OK" };
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
          const res = await apiRequest.post("/login", body);
          const result = await res.json();
          console.log({ result });
          if (result.error || result.errors) {
            throw new Error(
              result.message || result.error || "Something went wrong"
            );
          }
          set((prev) => ({ ...prev, session: result }));
          return { error: false, message: "OK" };
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
