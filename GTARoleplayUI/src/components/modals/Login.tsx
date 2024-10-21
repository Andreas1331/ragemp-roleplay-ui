import { Modal, ModalContent } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { LockIcon, MailIcon } from "@/components/icons"; 
import { FormEvent, useState } from "react";
import { useModal } from "@/contexts/ModalContext"; 

export const LoginModal = () => {
    const { modals } = useModal(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        
        // @ts-ignore
        mp.trigger("OnLoginSubmitted::Client", email, password);
    };

    return (
        <>
            <Modal
                isOpen={modals.login} 
                size={"xl"}
                hideCloseButton={true}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className="select-none">
                <form onSubmit={handleSignIn}>
                        <div className="bg-[#284b63] text-white p-10 flex flex-col justify-center">
                            <h2 className="text-3xl mb-6">Login</h2>
                            <Input
                                autoFocus
                                label="Username or email"
                                className="mb-6"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isRequired
                                endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                            />
                            <Input
                                label="Password"
                                type="password"
                                className="mb-6"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isRequired
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                            />
                            <div className="flex justify-between mb-6">
                                <a href="#" className="text-sm text-blue-400">Forgot password?</a>
                            </div>
                            <Button type="submit" className="bg-blue-500 text-l py-3 rounded-lg">
                                Continue
                            </Button>
                        </div>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};