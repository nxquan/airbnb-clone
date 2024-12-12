"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryLabel?: string;
  secondaryAction?: () => void;
}

const Modal = ({
  isOpen,
  onClose,
  actionLabel,
  onSubmit,
  title,
  body,
  disabled,
  footer,
  secondaryAction,
  secondaryLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return null;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, isOpen]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return null;
    }

    onSubmit();
  }, [onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return null;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center bg-neutral-700/60 z-50 fixed inset-0 focus:outline-none">
      <div className="relative mx-auto my-6 w-full md:w-4/6 lg:w-3/6 xl:w-2/5 max-full md:h-3/4 lg:h-4/5">
        <div
          className={`translate duration-300 h-full ${
            showModal ? "translate-y-0" : "translate-y-full"
          }
          ${showModal ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="translate max-h-full md:max-h-full lg:max-h-full w-full bg-white rounded-lg shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-center px-6 h-16 rounded-t relative border-b shrink-0">
              <button
                className="hover:bg-neutral-100 cursor-pointer p-2 rounded-full absolute left-5"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <span className="font-bold text-lg inline-block">{title}</span>
            </div>
            {/* Body */}
            <div className="overflow-x-hidden overflow-y-auto max-h-full">
              <div className="p-6">{body}</div>
              {/* Footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryLabel && (
                    <Button
                      label={secondaryLabel!}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button label={actionLabel} onClick={handleSubmit} primary />
                </div>
                {footer && (
                  <div className="flex items-center my-2 before:block before:w-full before:h-[1px] before:bg-slate-300 after:block after:w-full after:h-[1px] after:bg-slate-300 after:ml-4 before:mr-4">
                    or
                  </div>
                )}
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
