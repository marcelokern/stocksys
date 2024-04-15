import { toast } from "@/components/ui/use-toast"

export const errorHandler = (error: any) => {
    if (error.errorCode && (error.message || error.messages)) {

        if (error.messages) {
            error.messages.map((error: string) => {
                toast({
                    variant: "error",
                    description: error
                })
            })
        } else {
            toast({
                variant: "error",
                description: error.message
            })
        }

    } else {

        toast({
            variant: "error",
            description: 'Ops, algo deu errado :( Por favor, tente novamente mais tarde.'
        })
    }
}