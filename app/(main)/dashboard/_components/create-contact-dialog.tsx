"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import CreateCard from "./create-card";
import { Loader2, UserRoundPlus } from "lucide-react";
import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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

export function CreateContactDialog() {
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
            const res = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
                return
            }

            toast.success("Berhasil membuat contact!")
            form.reset()
            setIsOpen(false)
        } catch (err) {
            console.error(err)
            toast.error("Terjadi kesalahan pada server.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div>
                    <CreateCard />
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <UserRoundPlus size={20} strokeWidth={2} />
                                <span>Create New Contact</span>
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
                                <Button type="button" variant="outline" disabled={isLoading}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
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
