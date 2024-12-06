"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    }).finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        required
        register={register}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <>
      <div className="flex flex-col gap-4">
        <Button
          label="Continue with Facebook"
          outline
          icon={FaFacebookSquare}
          iconColor="#1877F2"
          onClick={() => { }}
        />
        <Button
          label="Continue with Google"
          outline
          icon={FcGoogle}
          onClick={() => signIn('google')}
        />
        <Button
          label="Continue with Github"
          outline
          icon={AiFillGithub}
          onClick={() => signIn('github')}
        />
      </div>
      <div className="text-neutral-500 font-light flex items-center justify-center mt-4">
        Don&apos;t have an account?{" "}
        <div
          className="text-neutral-800 cursor-pointer hover:underline ml-1.5"
          onClick={() => {
            loginModal.onClose();
          }}
        >
          Sign up
        </div>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={"Login"}
      title="Login"
      disabled={isLoading}
    />
  );
};

export default LoginModal;
