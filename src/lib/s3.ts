import { S3, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { File } from 'formidable'
import fs from 'fs'

const s3client = new S3({
  region: process.env.AWS_IAM_USER_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY || '',
  },
})

export const uploadToS3 = async (file: File, bucketName: string) => {
  return new Promise<{
    status: boolean
    filePath?: string
    fileName?: string
    newFilename?: string
    fileType?: string
    mimeType?: string
  }>(async (resolve) => {
    try {
      // Get information from uploaded file
      const fileBuffer = fs.readFileSync(file.filepath)
      const fileType = file.mimetype || ''
      const extension = String(file.originalFilename).split('.').pop()
      const fileName = `${file.newFilename}.${extension}`

      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: fileType,
      }

      // Payload file to s3
      await s3client.send(new PutObjectCommand(params))
      resolve({
        status: true,
        filePath: process.env.AWS_IAM_BASE_URL + '/' + fileName,
        fileName: String(file.originalFilename),
        newFilename: fileName,
        fileType: extension,
        mimeType: fileType,
      })
    } catch (err) {
      resolve({ status: false })
    }
  })
}

export const deleteFromS3 = async (name: string, bucketName: string) => {
  return new Promise<{
    status: boolean
  }>(async (resolve) => {
    try {
      const result = await s3client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: name,
        })
      )

      resolve({ status: true })
    } catch (err) {
      resolve({ status: false })
    }
  })
}

