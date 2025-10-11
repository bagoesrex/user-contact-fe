import Link from "next/link";
import { APP_CONFIG } from "@/config/app-config";
import LoginForm from "../_components/login-form";

export default function LoginPage() {
    return (
        <>
            <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-medium">Login to your account</h1>
                    <p className="text-muted-foreground text-sm">Please enter your details to login.</p>
                </div>
                <LoginForm />
            </div>

            <div className="absolute top-5 flex w-full justify-end px-10">
                <div className="text-muted-foreground text-sm">
                    Don&apos;t have an account?{" "}
                    <Link className="text-foreground" href="register">
                        Register
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-5 flex w-full px-10">
                <div className="text-sm">{APP_CONFIG.copyright}</div>
            </div>
        </>
    );
}
