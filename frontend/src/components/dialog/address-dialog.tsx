import { MapPin } from "lucide-react";
import { MyButton } from "../ui/my-button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";

interface AddressDialogProps{
    uuid: string
}

export function AddressDialog({ uuid }: AddressDialogProps){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <MyButton 
                    icon={<MapPin/>}
                    size="h-[30px] w-[30px]"
                />
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                <DialogTitle>Endereço</DialogTitle>
                </DialogHeader>

                {/* Form de endereço */}
            </DialogContent>
        </Dialog>
    );
}