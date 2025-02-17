import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploadProps {
  onUpload: (files: File[]) => void;
}

export const Upload = ({ onUpload }: UploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Accept only images
    multiple: true, // Allow multiple file uploads
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-600">Drop the files here...</p>
      ) : (
        <p className="text-gray-600">
          Drag & drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};
