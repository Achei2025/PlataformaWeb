import type React from "react"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center p-6">
        <img
          src="/image/verificado.gif"
          alt="Sucesso"
          className="w-24 h-24 mb-4"
        />
        <p className="text-lg font-semibold text-center text-green-600">{message}</p>
      </DialogContent>
    </Dialog>
  )
}

