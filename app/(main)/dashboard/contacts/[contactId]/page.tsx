import ContactWrapper from "./_components/contact-wrapper";

export default function ContactDetailPage({
    params,
}: {
    params: { contactId: string }
}) {
    const { contactId } = params;

    return (
        <ContactWrapper contactId={contactId} />
    )
}