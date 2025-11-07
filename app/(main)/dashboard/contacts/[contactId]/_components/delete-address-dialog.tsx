"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAddress } from "@/hooks/use-addresses";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

interface DeleteAddressDialogProps {
    contactId: number
    addressId: number
}

export default function DeleteAddressDialog({ contactId, addressId }: DeleteAddressDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { mutate: deleteContact, isPending } = useDeleteAddress(contactId)

    async function handleDelete() {
        deleteContact(addressId, {
            onSuccess: () => {
                setIsOpen(false)
            }
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
                    <AlertDialogTitle>Yakin ingin menghapus adress ini?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Address ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
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