import { Button } from "@/components/ui/button";

export function OptionButton({
    icon,
  }: Readonly<{
    icon: React.ReactNode;
}>) {
    return (
        <Button className='optButton' size="icon" variant='outline'>
            {icon}
        </Button>
    );
}