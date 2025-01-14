"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FaFacebookSquare } from "react-icons/fa";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Register successfully!");
        loginModal.onOpen();
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
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
          onClick={() => {}}
        />
        <Button
          label="Continue with Google"
          outline
          icon={FcGoogle}
          onClick={() => {
            signIn("google");
          }}
        />
        <Button
          label="Continue with Github"
          outline
          icon={AiFillGithub}
          onClick={() => {
            signIn("github");
          }}
        />
      </div>
      <div className="text-neutral-500 font-light flex items-center justify-center mt-4">
        Already have account?{" "}
        <div
          className="text-neutral-800 cursor-pointer hover:underline ml-1.5"
          onClick={() => {
            registerModal.onClose();
            loginModal.onOpen();
          }}
        >
          Log in
        </div>
      </div>
    </>
  );

  return (
    <Modal
      title="Register"
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerModal.onClose}
      isOpen={registerModal.isOpen}
      actionLabel="Continue"
      secondaryAction={registerModal.onClose}
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
