"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ContactCard from "./contact-card";
import { Contact } from "@/types/contact";
import { Loader2 } from "lucide-react";

interface ContactWrapperProps {
    contactId: string;
}

export default function ContactWrapper({ contactId }: ContactWrapperProps) {
    const [contact, setContact] = useState<Contact>();

    async function fetchContact() {
        try {
            const res = await fetch(`/api/contacts/${contactId}`);
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setContact(data.contact || null);
        } catch (err) {
            console.error(err);
            toast.error("Terjadi kesalahan pada server.");
        }
    }

    useEffect(() => {
        fetchContact();
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
        <div className="max-w-5xl mx-auto w-full mt-14 p-2 gap-3">
            <ContactCard contact={contact} />
        </div>
    );
}
