import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";

import { uploadToS3 } from "@/lib/s3";
import { getCookie } from "@/lib/utils";

import axios from "axios";

type ProcessedFiles = Array<[string, File | string]>;

type S3UploadInterface = {
  status: boolean;
  filePath?: string;
  fileName?: string;
  fileType?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Getting File With Formidable
  const result = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = formidable({});
      const data: ProcessedFiles = [];
      form.on("file", function (field, file) {
        data.push([field, file]);
      });
      form.on("field", function (field, content) {
        data.push([field, content]);
      });
      form.on("end", () => resolve(data));
      form.on("error", (err) => reject(err));
      form.parse(req, () => {
        //
      });
    }
  ).catch((e) => {
    return res.status(505).send("Network Issue!");
  });

  try {
    // Getting Session
    const session = getCookie(req);
    console.log(session);
    if (result?.length) {
      const { status, fileName, filePath, fileType }: S3UploadInterface =
        await uploadToS3(result[1][1] as File, "mesa-store");

      if (status) {
        // Send to Real Server
        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_BASE_URL + "/upload",
          {
            projectId: result[0][1],
            url: filePath,
            name: fileName,
            type: fileType,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: session,
            },
          }
        );

        if (data && data.status) {
          res.status(200).json({
            status: true,
          });
        }
      } else {
        return res.status(402).send("Failed file upload");
      }
    } else {
      throw new Error("Failed operation");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong!");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
