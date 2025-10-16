import { contacts } from "@/data/dummy-contacts";
import ContactCard from "./_components/contact-card";
import { CreateContactDialog } from "./_components/create-contact-dialog";

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto w-full mt-14 py-2 px-2 gap-3">
            <CreateContactDialog />
            {contacts.map((contact) =>
                <ContactCard
                    key={contact.id}
                    id={contact.id}
                    first_name={contact.first_name}
                    last_name={contact.last_name}
                    email={contact.email}
                    phone={contact.phone}
                />
            )}
        </div>
    )
}