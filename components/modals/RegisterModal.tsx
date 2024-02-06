import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import { Simulate } from "react-dom/test-utils";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");

  const [isLoading, setLoading] = useState(false);
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("/api/register", { email, password, username, name });
      toast.success("Account Created");
      await signIn("credentials", { email, password });
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
    }
    setLoading(false);
  }, [registerModal, email, password, username, name]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        value={email}
        disabled={isLoading}
      />
      <Input
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        value={name}
        disabled={isLoading}
      />
      <Input
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
        value={username}
        disabled={isLoading}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        value={password}
        disabled={isLoading}
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign In
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      footer={footerContent}
      title="Create an account"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      actionLabel="Register"
      body={bodyContent}
    />
  );
};

export default RegisterModal;
