import { useState } from "react"

interface ToastMessage {
  title: string
  description: string
}

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null)

  const toast = ({ title, description }: ToastMessage) => {
    setToastMessage({ title, description })
    setTimeout(() => setToastMessage(null), 3000)
  }

  return {
    toast,
    ToastComponent: toastMessage ? (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <strong>{toastMessage.title}</strong>
        <p>{toastMessage.description}</p>
      </div>
    ) : null,
  }
}
