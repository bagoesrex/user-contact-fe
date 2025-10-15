import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CreateCard from "./create-card";
import { UserRoundPlus } from "lucide-react";

export function CreateContactDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <CreateCard />
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form>
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
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input id="first_name" name="first_name" placeholder="Enter first name" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input id="last_name" name="last_name" placeholder="Enter last name" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="sikeonk@gmail.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" placeholder="08*********" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
