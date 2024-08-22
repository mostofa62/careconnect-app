import React, { useRef, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';

interface FileUploadProps {
  onFileUpload: (fileId: string) => void;
  chunkUrl:string;
}

const CHUNK_SIZE = 1024 * 1024; // 1MB chunk size

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, chunkUrl }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    setUploadProgress(0); // Reset progress when a new file is selected
    console.log('File selected:', file); // Debugging
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
    setSelectedFile(file);
    setUploadProgress(0); // Reset progress when a new file is selected
    setIsDragging(false);
    console.log('File dropped:', file); // Debugging
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('No file selected'); // Debugging
      return;
    }

    const fileSize = selectedFile.size;
    const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
    let currentChunk = 0;
    setIsUploading(true);

    console.log('Selected file name in chunk: ',selectedFile.name)

    const uploadChunk = async (start: number) => {
      const end = Math.min(start + CHUNK_SIZE, fileSize);
      const chunk = selectedFile.slice(start, end);

      

      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('fileName', selectedFile.name);
      formData.append('chunkNumber', (currentChunk + 1).toString());
      formData.append('totalChunks', totalChunks.toString());

      try {
        const response = await axios.post(chunkUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        currentChunk++;

        const progress = Math.round((currentChunk / totalChunks) * 100);
        setUploadProgress(progress);

        if (currentChunk < totalChunks) {
          await uploadChunk(end); // Upload the next chunk
        } else {
          const fileId = response.data.fileId as string; // Final response will return the fileId
          onFileUpload(fileId); // Pass the file ID back to the parent component or use it as needed
          console.log('File uploaded successfully:', fileId);
        }
      } catch (error) {
        console.error('Error uploading chunk:', error);
        setIsUploading(false);
        return;
      }
    };

    console.log('Starting upload...'); // Debugging
    await uploadChunk(0);
    setIsUploading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/*
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()} // Trigger click on input when the drop area is clicked
        className={clsx(
          'border-2 border-dashed rounded-md p-6 text-center cursor-pointer',
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
        )}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef} // Reference to the hidden input
        />
        <p className="text-blue-500 hover:underline">
          {selectedFile ? selectedFile.name : 'Drag & drop a file here, or click to select one'}
        </p>
      </div>
      */}
      <input
        type="file"
        onChange={handleFileChange}
        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-[#ccc999] text-black py-2 rounded-md hover:bg-blue-600"
      >
        Upload
      </button>
      {isUploading && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-green-500 h-full rounded-full text-center text-white"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
