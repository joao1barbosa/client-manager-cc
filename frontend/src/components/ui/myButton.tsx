import { Button } from "@/components/ui/button";

interface MyButtonProps{
    icon: React.ReactNode;
    size?: string;
    disable?: boolean;
    onClick?: ()=>void;
}

export function MyButton({ icon, size, disable, onClick }: MyButtonProps) {
    return (
        <Button className={`optButton ${size}`} size="icon" variant='outline' disabled={disable} onClick={onClick}>
            {icon}
        </Button>
    );
}