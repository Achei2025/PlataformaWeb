import * as React from "react"

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ open, onOpenChange, children }) => {
  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">{children}</div>
    </div>
  ) : null
}

export const AlertDialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-4">{children}</div>
)

export const AlertDialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-lg font-semibold">{children}</div>
)

export const AlertDialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
)

export const AlertDialogDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-600">{children}</p>
)

export const AlertDialogFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex justify-end space-x-2 mt-4">{children}</div>
)

export const AlertDialogCancel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => console.log("Cancelado")}>
    {children}
  </button>
)

export const AlertDialogAction: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({
  onClick,
  children,
}) => (
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={onClick}>
    {children}
  </button>
)
