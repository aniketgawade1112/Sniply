import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./input";
import Error from "./error";
import * as Yup from "yup";
import { Button } from "./button";
import useFetch from "@/hooks/useFetch";
import { login } from "@/db/ApiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const scehma = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 characters")
          .required("Password is required"),
      });
      await scehma.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};
      e?.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card className="w-full max-w-md border-slate-800 bg-slate-900/80 text-slate-100 shadow-xl shadow-slate-950/60">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-slate-400">
          Log in to your Sniply account to manage and track your links.
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">
            Email address
          </label>
          <Input
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleInputChange}
            className="border-slate-700 bg-slate-950/60 text-sm placeholder:text-slate-500"
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
            className="border-slate-700 bg-slate-950/60 text-sm placeholder:text-slate-500"
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-2">
        <Button
          onClick={handleLogin}
          className="w-full rounded-full bg-cyan-500 text-sm font-medium hover:bg-cyan-400"
        >
          {loading ? <BeatLoader size={8} color="#0f172a" /> : "Log in"}
        </Button>
        <p className="w-full text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer font-medium text-cyan-400 hover:text-cyan-300"
            onClick={() =>
              navigate(
                `/auth?mode=signup${longLink ? `&createNew=${longLink}` : ""}`
              )
            }
          >
            Sign up
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
