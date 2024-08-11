import { Button } from "@/components/ui/button";

interface OptionButtonProps{
    icon: React.ReactNode
    size?: string
    disable?: boolean
}

export function OptionButton({ icon, size, disable }: OptionButtonProps) {
    return (
        <Button className={`optButton ${size}`} size="icon" variant='outline' disabled={disable}>
            {icon}
        </Button>
    );
}