import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import registerModal from "@/components/modals/RegisterModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await signIn("credentials", { email, password });
      loginModal.onClose;
    } catch (error) {
      console.log(error);
    } finally {
    }
    setLoading(false);
  }, [loginModal, email, password]);

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Croaker?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Create an account
        </span>
      </p>
    </div>
  );
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        value={email}
        disabled={isLoading}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="login"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      actionLabel="Sign In"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
