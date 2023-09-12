"use client";
import React, { useEffect, useState } from "react";
import AnimWrapper from "./animWrapper";
import { UploadIcon } from "@/lib/assets/icons";
import { FormSubheading, FormText, FormTitle, TextArea } from "./formType";
import { FormProps } from "@/types/form";
import { useCustomSnackbar } from "@/lib/hooks/useSnackbar";

export const dynamic = "force-dynamic";

export default function FormData({
  updateForm,
  updateData,
  form,
}: {
  updateForm: (arg0: any) => void;
  updateData?: (arg0: any) => void;
  form: FormProps;
}) {
  if (!updateData) return;
  const { toast } = useCustomSnackbar();
  const [activeToastId, setActiveToastId] = useState<string | number | null>(null);

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        updateData({
          name: file.name,
          type: file.type,
          data: reader.result as string,
        });
      };
      reader.readAsDataURL(file);

      toast.success("GG", {
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (e) {
      console.error(e);
      toast.error("Error", {
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDeleteFile = () => {
    updateData(undefined);
  };

  useEffect(() => {
    if (form.textData && form.fileData) {
      if (activeToastId) return;

      const toastId = toast.warning("Choose either a file upload or manual data entry, not both.", {
        type: "error",
        isLoading: false,
        autoClose: 3000,
        onClose: () => setActiveToastId(null),
      });
      setActiveToastId(toastId);
    }
  }, [form]);

  return (
    <AnimWrapper>
      <FormTitle>Let's upload your data</FormTitle>
      <FormText>
        Begin by providing the data you'd like to analyze and visualize. Whether you have a ready-to-go file or wish to manually input text, we've got
        you covered.
      </FormText>
      <FormSubheading>File Upload</FormSubheading>
      <FormText>Drag and drop your file here or click to browse. We support CSV, Excel, Text, and JSON formats.</FormText>
      <div className="border-border bg-foreground relative mb-16 h-24 w-full select-none overflow-hidden rounded-xl border-[1.5px]">
        <div className="group absolute left-1/2 top-1/2 flex aspect-square h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-l-foreground duration-200 hover:brightness-110 dark:bg-d-foreground">
          <input
            type="file"
            accept=".txt, .csv, .xlsx, .json"
            onChange={(e) => uploadFile(e)}
            className="absolute left-0 right-0 h-full w-full cursor-pointer opacity-0 file:hidden file:text-transparent"
          />

          {/* Conditionally render based on whether a file is present */}
          {form.fileData ? (
            <div className="flex h-full w-full items-center justify-center">
              <span className="mr-2">{form.fileData?.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile();
                }}
                className="z-10 text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ) : (
            <UploadIcon className="w-6 stroke-l-text-main opacity-60 duration-200 group-hover:opacity-100 dark:stroke-d-text-main" />
          )}
        </div>
      </div>

      <div className="mx-auto mb-8 flex w-full max-w-sm items-center">
        <div className="bg-border h-1 w-full rounded-lg bg-l-border/40 dark:bg-d-border" />
        <p className="font-sm px-6 font-medium text-l-text-second dark:text-d-text-second">or</p>
        <div className="bg-border h-1 w-full rounded-lg bg-l-border/40 dark:bg-d-border" />
      </div>

      <FormSubheading>Manual Input</FormSubheading>
      <FormText>
        If you don't have a file ready, you can also paste your data directly into the textbox below. Ensure your data is well-structured for accurate
        results.
      </FormText>
      <FormText>Hint: For CSV data, ensure values are comma-separated. For JSON, ensure you have valid syntax.</FormText>
      <TextArea updateForm={updateForm} value={form.textData} id="textData" label="Paste in your data..." />
    </AnimWrapper>
  );
}
