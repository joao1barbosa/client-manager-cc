import { Button } from "@/components/ui/button";

interface OptionButtonProps{
    icon: React.ReactNode;
    size?: string;
    disable?: boolean;
    onClick?: ()=>void;
}

export function OptionButton({ icon, size, disable, onClick }: OptionButtonProps) {
    return (
        <Button className={`optButton ${size}`} size="icon" variant='outline' disabled={disable} onClick={onClick}>
            {icon}
        </Button>
    );
}