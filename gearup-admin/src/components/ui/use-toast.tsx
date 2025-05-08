"use client"

import { useToast as useToastOriginal } from "@/hooks/use-toast"

export const toast = (props: Parameters<ReturnType<typeof useToastOriginal>["toast"]>[0]) => {
    const { toast } = useToastOriginal()
    return toast(props)
}
