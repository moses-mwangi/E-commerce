import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Dispatch, SetStateAction } from "react";

interface Delete {
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
}

export default function DeleteCategory({
  setShowDeleteDialog,
  handleDelete,
}: Delete) {
  return (
    <div className="z-50 fixed top-0 backdrop-blur-[2px] left-0 h-screen w-screen inset-0 bg-black/65 flex items-center justify-center">
      <Card className=" w-96">
        <CardHeader>
          <CardTitle>Deleting Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <div>
              Are you sure you want to delete this category.This action cannot
              be undone
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="bg-orange-500/90 h-8 hover:bg-orange-500"
            type="reset"
            onClick={() => {
              setShowDeleteDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete();
            }}
            className="bg-red-500/90 h-8 hover:bg-red-500"
            type="submit"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
