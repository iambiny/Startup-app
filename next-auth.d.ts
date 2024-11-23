/**
 * Sử dụng 'Module Augmentation' để mở rộng thuộc tính của Interface trong module
 */

import "next-auth";

declare module "next-auth" {
    interface Session {
        id: string
    }

    interface JWT {
        id: string
    }
}