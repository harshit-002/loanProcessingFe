import React from "react";
import { createContext, useState, useEffect, type ReactNode } from "react";
import {
  loginApi,
  registerApi,
  logoutApi,
  fetchCurrentUserApi,
} from "../api/authApi.ts";
import type { Account, AuthContextType } from "../interface/interfaces.ts";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function hasSessionCookie(name = "JSESSIONID") {
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(name + "="));
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasSessionCookie()) {
      // no session cookie, no need to fetch user
      setLoading(false);
      return;
    }
    const fetchCurrentUser = async () => {
      try {
        const res = await fetchCurrentUserApi();
        setAccount(res);
      } catch (err) {
        console.log("Error fetching current user");
        setAccount(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      await loginApi(username, password);
      const res = await fetchCurrentUserApi();
      setAccount(res);
    } catch (err: any) {
      if (err.response && err.response.data)
        alert(
          "Enter your correct username & password :" +
            (err.response.data.error || err.response.data.message)
        );
      else alert("Enter your correct username & password:" + err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    password: string,
    ssnNumber: string
  ) => {
    setLoading(true);
    try {
      await registerApi(username, password, ssnNumber);
      alert("User Registered");
    } catch (err: any) {
      if (err.response && err.response.data) {
        alert(
          "Error registering user: " +
            (err.response.data.error || err.response.data.message)
        );
      } else {
        alert("Error registering user: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutApi();
    setAccount(null);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { account, loading, login, register, logout } },
    children
  );
};
