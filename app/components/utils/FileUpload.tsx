import React, { useRef, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';

interface FileUploadProps {
  label:string;
  onFileUpload: (fileId: string) => void;
  chunkUrl:string;
  allowed_extension?:string[],
  max_file_size?:number;
}

const CHUNK_SIZE = 1024 * 100; // 1MB chunk size
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB max file size
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'pdf', 'docx']; // Add the allowed extensions here

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, chunkUrl, allowed_extension, max_file_size ,label }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValidExtension = (fileName: string) => {
    const a_ex = allowed_extension && allowed_extension.length ? allowed_extension:ALLOWED_EXTENSIONS;
    return  a_ex.some(ext => fileName.toLowerCase().endsWith(ext));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    

    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      const a_ex = allowed_extension && allowed_extension.length ? allowed_extension:ALLOWED_EXTENSIONS;
      const isExtensionAllowed = a_ex.includes(fileExtension || '');

      ///alert(fileExtension)

      

      if (!isExtensionAllowed) {
        setErrorMessage(`File type not allowed. Allowed types: ${a_ex.join(', ')}`);
        setSelectedFile(null);
        return;
      }

      const max_file_size_temp = max_file_size ? max_file_size:MAX_FILE_SIZE
      if (file.size > max_file_size_temp) {
        setErrorMessage(`File size exceeds the maximum limit of ${max_file_size_temp / (1024 * 1024)}MB`);
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setUploadProgress(0); // Reset progress when a new file is selected
      setErrorMessage(null); // Clear any previous error messages
      if(file){
        await handleUpload(file); // Automatically trigger upload after file selection
      }
      


    }

  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;

    if (file) {
        const fileList = new DataTransfer();
        fileList.items.add(file);

        // Create a synthetic event object with a target containing the FileList
        const syntheticEvent = {
            target: {
                files: fileList.files,
            },
        } as React.ChangeEvent<HTMLInputElement>;

        handleFileChange(syntheticEvent);
    }
    
    setIsDragging(false);
};


  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async (file: File) => {
    const fileSize = file.size;
    const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
    let currentChunk = 0;
    setIsUploading(true);

    const uploadChunk = async (start: number) => {
      const end = Math.min(start + CHUNK_SIZE, fileSize);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('fileName', file.name);
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
      }
    };

    await uploadChunk(0);
    setIsUploading(false);
  };

  return (
    <div className="w-full">
      <label className="mb-[10px] block text-[16px] font-medium text-[#000000]">
          {label}
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()} // Trigger click on input when the drop area is clicked
        className={clsx(
          'border-2 border-dashed rounded-md px-6 py-2 text-center cursor-pointer w-full h-full',
          isDragging ? 'border-primary bg-secondary' : 'border-[#C3C9CE] bg-[#F5F7F9]'
        )}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef} // Reference to the hidden input
        />
        <p className="text-black hover:underline text-[16px]">
          {selectedFile ? selectedFile.name : <span><span>Drag & Drop</span> OR <span className='text-[#0166FF]'>Browse</span></span>}
        </p>
        {errorMessage && <p className="text-[#B45454] text-[14px]">{errorMessage}</p>}
        {isUploading && (
        <div className="w-full bg-gray rounded-full h-2.5">
        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
      </div>
      
    )}
      </div>
      
    </div>
  );
};

export default FileUpload;
