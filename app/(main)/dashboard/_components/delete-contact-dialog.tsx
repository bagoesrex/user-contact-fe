"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteContact } from "@/hooks/use-contacts";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

interface DeleteContactDialogProps {
    contactId: number
}

export default function DeleteContactDialog({ contactId }: DeleteContactDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { mutate: deleteContact, isPending } = useDeleteContact()

    async function handleDelete() {
        deleteContact(contactId, {
            onSuccess: () => {
                setIsOpen(false)
            },
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} className="cursor-pointer">
                    <>
                        <Trash size={12} />
                        <p className="text-sm">Delete</p>
                    </>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Yakin ingin menghapus kontak ini?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Kontak ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}