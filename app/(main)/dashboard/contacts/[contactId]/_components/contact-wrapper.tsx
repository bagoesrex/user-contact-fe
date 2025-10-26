"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ContactCard from "./contact-card";
import { Contact } from "@/types/contact";
import { ArrowLeft, IdCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Address } from "@/types/address";

interface ContactWrapperProps {
    contactId: string;
}

export default function ContactWrapper({ contactId }: ContactWrapperProps) {
    const [contact, setContact] = useState<Contact>();
    const [addresses, setAddresses] = useState<Address[]>([])

    async function fetchContactData() {
        try {
            const [contactRes, addressRes] = await Promise.all([
                fetch(`/api/contacts/${contactId}`),
                fetch(`/api/contacts/${contactId}/addresses`)
            ]);

            const [contactData, addressData] = await Promise.all([
                contactRes.json(),
                addressRes.json()
            ]);

            if (!contactRes.ok) toast.error(contactData.message);
            if (!addressRes.ok) toast.error(addressData.message);

            setContact(contactData.contact || null);
            setAddresses(addressData.addresses || []);
        } catch (err) {
            console.error(err);
            toast.error("Terjadi kesalahan pada server.");
        }
    }

    useEffect(() => {
        fetchContactData()
    }, [contactId]);

    if (!contact) {
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
            <ContactCard contact={contact} addresses={addresses} />
        </div>
    );
}
