'use client'

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/action";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { toast } = useToast();
    const router = useRouter();
    
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title"),
                description: formData.get("description"),
                category: formData.get("category"),
                link: formData.get("link"),
                details: formData.get("details"),
            }
            await formSchema.parseAsync(formValues);    // validate the form
            const result = await createPost(prevState, formData);   // *** Server Action ***
            // console.log(result);
            if (result.status === 'SUCCESS') {
                toast({
                    title: "Success",
                    description: "Your startup has been created successfully",
                });
                router.push(`/startup/${result._id}`);
            }
            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldError = error.flatten().fieldErrors;
                setErrors(fieldError as unknown as Record<string, string>);
                toast({
                    title: 'Error',
                    description: 'Please check your input and try again',
                    variant: 'destructive'
                })
                return {
                    ...prevState,
                    error: 'Validation failed',
                    status: 'ERROR'
                }
            }
            toast({
                title: 'Error',
                description: 'An unexpected error has occurred',
                variant: 'destructive'
            })
            return {
                ...prevState,
                error: 'An unexpected error has occurred',
                status: 'ERROR'
            }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
            error: '',
            status: 'INITIAL'
        }
    );

    return (
        <form action={formAction}
            className="startup-form"
        >
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input
                    id="title" name="title"
                    className="startup-form_input"
                    required placeholder="Startup Title"
                />
                {errors.title && (<p className="startup-form_error">{errors.title}</p>)}
            </div>

            <div>
                <label htmlFor="description" className="starup-form_label">Description</label>
                <Textarea
                    id="description" name="description"
                    className="startup-form_textarea"
                    required placeholder="Startup Description"
                />
                {errors.description && (<p className="startup-form_error">{errors.description}</p>)}
            </div>

            <div>
                <label htmlFor="category" className="starup-form_label">Category</label>
                <Input
                    id="category" name="category"
                    className="startup-form_input"
                    required placeholder="Startup Category (Tech, Health, Education...)"
                />
                {errors.category && (<p className="startup-form_error">{errors.category}</p>)}
            </div>

            <div>
                <label htmlFor="link" className="starup-form_label">Image URL</label>
                <Input
                    id="link" name="link"
                    className="startup-form_input"
                    required placeholder="Startup Image URL"
                />
                {errors.link && (<p className="startup-form_error">{errors.link}</p>)}
            </div>

            <div>
                <label htmlFor="details" className="starup-form_label">Details</label>
                <Textarea
                    id="details" name="details"
                    className="startup-form_textarea"
                    required placeholder="Startup Details"
                />
                {errors.details && (<p className="startup-form_error">{errors.details}</p>)}
            </div>

            <Button type="submit" className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? 'Submitting...' : 'Submit Your Pitch'}
                <Send />
            </Button>
        </form>
    )
}

export default StartupForm;