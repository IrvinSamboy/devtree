import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Upload, ImageIcon } from "lucide-react"
interface ImageUploadButtonProps {
  onImageSelect?: (file: File) => void
  maxSize?: number // en MB
  acceptedTypes?: string[]
  buttonText?: string
}

export default function ImageUploadButton({
  onImageSelect,
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  buttonText = "Subir imagen",
}: ImageUploadButtonProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      setError(`Tipo de archivo no válido. Solo se permiten: ${acceptedTypes.join(", ")}`)
      return false
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`El archivo es demasiado grande. Máximo ${maxSize}MB`)
      return false
    }

    setError(null)
    return true
  }

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onImageSelect?.(file)
      }
    },
    [onImageSelect],
  )

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFile(files[0]) // Solo procesamos el primer archivo
      }
    },
    [handleFile],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFile(files[0]) // Solo procesamos el primer archivo
      }
      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [handleFile],
  )

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative">
      <Button
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        variant={isDragOver ? "default" : "outline"}
        className={`w-full transition-all ${isDragOver ? "border-primary bg-primary/10 scale-105" : ""}`}
      >
        <div className="flex items-center gap-2">
          {isDragOver ? <ImageIcon className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
          <span>{isDragOver ? "Suelta la imagen" : buttonText}</span>
        </div>
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileInput}
        className="hidden"
      />

      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
          {error}
        </div>
      )}
    </div>
  )
}
