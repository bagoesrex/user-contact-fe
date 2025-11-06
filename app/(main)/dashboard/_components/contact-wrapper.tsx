"use client"

import { CreateContactDialog } from "./create-contact-dialog";
import ListContactCard from "./list-contact-card";
import { useContacts } from "@/hooks/use-contacts";

export default function ContactWrapper() {
    const { data: contacts = [], refetch } = useContacts()

    return (
        <>
            <CreateContactDialog onSuccess={refetch} />
            {
                contacts.map((contact) => (
                    <ListContactCard
                        key={contact.id}
                        contact={contact}
                        onSuccess={refetch}
                    />
                ))
            }
        </>
    )
}