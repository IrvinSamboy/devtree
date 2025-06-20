import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImageDropzone() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select only image files")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("The file is too large. Maximum 10MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setUploadedImage(result)
    }
    reader.onerror = (e) => {
      console.error("Error reading file:", e)
      alert("Error loading the image")
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Simplified and fixed drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setIsDragging(true)
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()

    // Only exit if actually leaving the main container
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files

    if (files.length > 0) {
      const file = files[0]
      handleFile(file)
    } else {
      const items = Array.from(e.dataTransfer.items)

      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (file) {
            handleFile(file)
            break
          }
        }
      }
    }
  }

  return (
    <div
      className={`
        relative w-full h-80 border-4 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden
        ${
          isDragging
            ? "border-emerald-400 border-solid bg-emerald-100 scale-105"
            : uploadedImage
              ? "border-emerald-400 border-solid"
              : "border-emerald-300 border-dashed bg-emerald-400 hover:bg-emerald-500"
        }
      `}
      style={{
        backgroundImage: uploadedImage ? `url(${uploadedImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

      {/* Trash button */}
      {uploadedImage && (
        <button
          onClick={removeImage}
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
          aria-label="Remove image"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Active drag state */}
      {isDragging && (
        <div className="absolute inset-0 bg-emerald-200/90 flex items-center justify-center z-10 border-4 border-dashed border-emerald-600 rounded-xl">
          <div className="text-emerald-800 text-center">
            <Upload className="w-20 h-20 mx-auto mb-4 animate-bounce" />
            <p className="text-2xl font-bold">Drop it here!</p>
            <p className="text-lg">Your image will upload automatically</p>
          </div>
        </div>
      )}

      {/* Default content */}
      {!uploadedImage && !isDragging && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Upload className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Drag and drop images</h3>
          <p className="text-lg mb-2 font-medium">Cover image</p>
          <p className="text-sm mb-6 opacity-90">or click to select files</p>

          <Button
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            Select Images
          </Button>

          <p className="text-xs mt-4 opacity-75">Maximum 1 file, 10MB each</p>
        </div>
      )}

      {/* Overlay for changing image */}
      {uploadedImage && !isDragging && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="text-white text-center">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Change image</p>
            <p className="text-xs opacity-75">Drag a new one or click</p>
          </div>
        </div>
      )}
    </div>
  )
}
