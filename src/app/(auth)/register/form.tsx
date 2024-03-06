"use client";

import Link from "next/link";
import Google from "@/components/shared/icons/google";
import Button from "@/components/ui/form-button";

export default function RegisterForm() {
    return (
        <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
            <Button
                text="Continue with Google"
                icon={<Google className="h-4 w-4" />}
            />
            <form className="flex flex-col space-y-3">
                <div>
                    <div className="mb-4 mt-1 border-t border-gray-300" />
                    <input
                        id="email"
                        name="email"
                        autoFocus
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        autoFocus
                        type="password"
                        autoComplete="password"
                        placeholder="Password"
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
                <Button
                    text="Continue with Email"
                    variant="secondary"
                />
            </form>
            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-gray-500 transition-colors hover:text-black"
                >
                    Sign in
                </Link>
                .
            </p>
        </div>
    );
}
