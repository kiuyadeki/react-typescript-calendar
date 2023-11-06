import { ChangeEvent, useState } from 'react';

export const useProfilePictureUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (readEvent) => {
        const result = readEvent.target?.result;
        if (typeof result === 'string') {
          setUploadedImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return { uploadedImage, handleImageChange };
}