import { create } from "zustand";

interface ImageStore {
  uploading: boolean;
  progress: number;
  setUploading: (value: boolean) => void;
  setProgress: (value: number) => void;
  setImageUrl: (url: string) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  uploading: false,
  progress: 0,
  setUploading: (uploading) => set({ uploading }),
  setProgress: (progress) => set({ progress }),
  setImageUrl: (url) => console.log("Set image URL:", url), // или твоя логика
}));
