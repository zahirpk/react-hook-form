"use client";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema, Inputs } from "./formSchema";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);

  //
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const handleForm: SubmitHandler<Inputs> = async (data: Inputs) => {
    const response = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        password: data.password,
        email: data.email,
      }),
    });

    if (!response.ok) {
      alert("something went wrong,Please try again!");
    }
    const result = await response.json();
    if (result.errors) {
      if (result.errors.firstName) {
        setError("firstName", {
          type: "server",
          message: result.errors.firstName,
        });
      } else if (result.errors.email) {
        setError("email", { type: "server", message: result.errors.email });
      } else if (result.errors.password) {
        setError("password", {
          type: "server",
          message: result.errors.password,
        });
      } else {
        alert("something went wrong");
      }
    } else {
      alert("Sign Up Successfull");
      formRef.current?.reset();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleForm)}
      className="grid justify-items-center mt-10"
    >
      <div>
        <label htmlFor="First Name" className="block text-sm my-2">
          {" "}
          First Name
        </label>
        <input
          type="text"
          {...register("firstName")}
          className="border border-e-gray-400 rounded-lg py-1.5 w-80"
        />
      </div>
      {errors.firstName && (
        <span className="text-red-500 py-3">{errors.firstName.message}</span>
      )}

      <div>
        <label htmlFor="email" className="block text-sm my-2">
          {" "}
          E-Mail
        </label>
        <input
          type="email"
          {...register("email")}
          className="border border-e-gray-400 rounded-lg py-1.5 w-80"
        />
      </div>
      {errors.email && (
        <span className="text-red-500 py-3">{errors.email.message}</span>
      )}

      <div>
        <label htmlFor="password" className="block text-sm my-2">
          {" "}
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="border border-e-gray-400 rounded-lg py-1.5 w-80"
        />
      </div>
      {errors.password && (
        <span className="text-red-500 py-3">{errors.password.message}</span>
      )}

      <input
        type="submit"
        className="py-1.5 w-80 cursor-pointer bg-red-500 my-2"
      />
    </form>
  );
}
