import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Contact } from "@/types/contact"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, SquarePen, UserPen } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const contactSchema = z.object({
    first_name: z.string()
        .min(1, { message: "First name is required." })
        .max(100, { message: "First name must be at most 100 characters long." }),
    last_name: z.string()
        .min(1, { message: "Last name is required." })
        .max(100, { message: "Last name must be at most 100 characters long." }),
    email: z.string()
        .min(1, { message: "Email is required." })
        .max(100, { message: "Email must be at most 100 characters long." }),
    phone: z.string()
        .min(1, { message: "Phone is required." })
        .max(20, { message: "Phone must be at most 20 characters long." })
        .regex(/^[0-9+]+$/, { message: "Phone number must contain only digits or '+'." })
})

interface UpdateContactDialogProps {
    contact: Contact
    onSuccess: () => void
}

export default function UpdateContactDialog({ contact, onSuccess }: UpdateContactDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit(values: z.infer<typeof contactSchema>) {
        setIsLoading(true)

        try {
            const res = await fetch(`/api/contacts/${contact.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
                return
            }

            toast.success("Berhasil memperbarui contact!")
            form.reset()
            setIsOpen(false)
            onSuccess()
        } catch (err) {
            console.error(err)
            toast.error("Terjadi kesalahan pada server.")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        form.reset({
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
        })
    }, [contact, form])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <>
                        <SquarePen size={12} />
                        <p className="text-sm">Edit</p>
                    </>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <UserPen size={20} strokeWidth={2} />
                                <span>Edit Contact</span>
                            </DialogTitle>
                            <DialogDescription>
                                Fill in the contact details below and click save.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-5">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="sikeonk@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="08*********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" disabled={isLoading} className="cursor-pointer">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading} className="cursor-pointer">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}