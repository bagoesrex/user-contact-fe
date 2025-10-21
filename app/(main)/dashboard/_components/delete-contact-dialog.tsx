"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteContactDialogProps {
    contactId: number
    onSuccess: () => void
}

export default function DeleteContactDialog({ contactId, onSuccess }: DeleteContactDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleDelete() {
        setIsLoading(true)

        try {
            const res = await fetch(`/api/contacts/${contactId}`, {
                method: "DELETE"
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message || "Contact gagal dihapus");
                return;
            }

            toast.success(data.message || "Contact berhasil dihapus");
            setIsOpen(false)
            onSuccess()
        } catch (err) {
            console.log(err)
            toast.error("Server error, please try again later.");
        } finally {
            setIsLoading(false)
        }
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
                        disabled={isLoading}
                    >
                        {isLoading ? (
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