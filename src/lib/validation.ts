import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(500),
    category: z.string().min(3).max(20),
    link: z.string()
        .url("URL in not valid!"),
        // .refine(async (url) => {         // check url is a valid image
        //     try {
        //         if (!url.startsWith('https://')) return false;
        //         const res = await fetch(url, { method: 'HEAD' });
        //         const contentType = res.headers.get("content-type");
        //         return contentType?.startsWith('image/');
        //     } catch (error) {
        //         return false;
        //     }
        // }),
    details: z.string().min(10)
})