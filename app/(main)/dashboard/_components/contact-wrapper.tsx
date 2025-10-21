"use client"

import { CreateContactDialog } from "./create-contact-dialog";
import { Contact } from "@/types/contact";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ListContactCard from "./list-contact-card";

export default function ContactWrapper() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    async function fetchContacts() {
        try {
            const res = await fetch("/api/contacts");
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message)
            }

            setContacts(data.contacts || []);
        } catch (err) {
            console.error(err)
            toast.error("Terjadi kesalahan pada server.");
        }
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <>
            <CreateContactDialog onSuccess={fetchContacts} />
            {
                contacts.map((contact) => (
                    <ListContactCard
                        key={contact.id}
                        contact={contact}
                        onSuccess={fetchContacts}
                    />
                ))
            }
        </>
    )
}