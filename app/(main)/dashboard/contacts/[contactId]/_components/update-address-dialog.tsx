import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUpdateAddress } from "@/hooks/use-addresses"
import { Address } from "@/types/address"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, SquarePen, UserPen } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

const addressSchema = z.object({
    street: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    province: z.string().max(100).optional(),
    country: z.string().min(1, "Country is required").max(100),
    postal_code: z.string().min(1, "Postal code is required").max(20),
})

interface UpdateAddressDialogProps {
    contactId: number
    address: Address
}

export default function UpdateAddressDialog({ contactId, address }: UpdateAddressDialogProps) {
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            street: "",
            city: "",
            province: "",
            country: "",
            postal_code: "",
        },
    })

    const { mutate: updateAddress, isPending } = useUpdateAddress(contactId);

    async function onSubmit(values: z.infer<typeof addressSchema>) {
        updateAddress(
            { id: address.id, values },
            {
                onSuccess: () => {
                    form.reset()
                    setIsOpen(false)
                }
            }
        )
    }

    useEffect(() => {
        form.reset({
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
        })
    }, [address, form])

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
                                <span>Edit Address</span>
                            </DialogTitle>
                            <DialogDescription>
                                Fill in the address details below and click save.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-5">
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Johar No.25, optional" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Semarang, optional" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Province</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jawa Tengah, optional" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Indonesia" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="postal_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" disabled={isPending} className="cursor-pointer">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending} className="cursor-pointer">
                                {isPending ? (
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