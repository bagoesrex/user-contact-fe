"use client";

import ContactCard from "./contact-card";
import { ArrowLeft, IdCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContact } from "@/hooks/use-contacts";
import { useAddresses } from "@/hooks/use-addresses";

interface ContactWrapperProps {
    contactId: string;
}

export default function ContactWrapper({ contactId }: ContactWrapperProps) {
    const { data: contact, isLoading: isContactLoading } = useContact(Number(contactId));
    const { data: addresses, isLoading: isAddressesLoading } = useAddresses(Number(contactId));

    if (!contact) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <span className="ml-2 text-primary font-medium">Contact not found.</span>
            </div>
        );
    }

    if (isContactLoading || isAddressesLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-primary font-medium">Loading contact...</span>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto w-full mt-14 p-2 space-y-2.5">
            <div className="relative flex items-center justify-between">
                <Button variant={"link"} asChild>
                    <Link href={`/dashboard`}>
                        <ArrowLeft />
                        <span>Back to Dashboard</span>
                    </Link>
                </Button>

                <div className="absolute left-1/2 -translate-x-1/2 flex flex-row items-center gap-2">
                    <IdCard size={30} />
                    <h1 className="text-2xl font-bold">
                        Contact Details
                    </h1>
                </div>
            </div>
            <ContactCard contact={contact} addresses={addresses ?? []} />
        </div>
    );
}
