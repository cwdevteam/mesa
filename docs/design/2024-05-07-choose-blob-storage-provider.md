---
title: Choose blob storage provider for uploads
date: 2024-05-07
status: Ready
authors:
  - Kevin Neaton <kevin@abstractgoods.cc>
version: v1.0
summary: Use Cloudflare R2 for blob storage. Consider adding Amazon S3 in the future for low-bandwidth, archival storage if needed.
---

## Context

Blob storage is needed to handle large files uploaded by users. Files need to
be stored in private bucket and accessible only via the project to which they
were uploaded.

Additionally, the pricing needs to be compatible with the project budget and
potential business models. For this purpose we will assume a future
subscription-based business model in which Mesa charges users a fixed-monthly
fee to cover the cost of operating the service, including blob storage. To keep
costs under control, Mesa will likely need to enforce limits on files uploads
and storage usage per user and/or project.

## Considered Options
- [Amazon S3](https://aws.amazon.com/s3/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Vercel Blob Storage](https://vercel.com/storage/blob)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

## Decision Outcome

Use [Cloudflare R2](https://developers.cloudflare.com/r2/) for blob storage via
the s3-compatible API. Consider adding [Amazon S3](https://aws.amazon.com/s3/)
in the future for low-bandwidth, archival storage if needed.

## Rationale

Cloudflare is the only option considered that does not charge for bandwidth.
That means users can download or stream their files as much as they like,
without increasing the monthly bill for Mesa. This means that we can avoid
introducing bandwidth limits, throttling, or otherwise passing the cost on to
users, making it highly compatible with the assumed pricing model. This and the
relatively low storage cost on R2 make it a good fit for our use case.

If in the future, if we find that bandwidth usage is low relative to storage, we
could consider using the archival storage tiers provided by S3 to reduce storage
costs per GB. This could be done by using a combination of S3 and R2, where S3
is used for archival storage of older projects and R2 is used for current
projects. Since R2 exposes an S3-compatible API, and does not charge for egress,
it would be relatively straight-forward and cost-effective to make the switch.
The same is not true for any of the other options considered.

### Vercel Blob Storage

While Vercel Blob Storage is built on R2, the pricing includes a charge for
bandwidth the API is not S3 compatible. Although the SDK provided by Vercel is
convenient, the pricing and lock-in make it an inferior option.

### Supabase Storage

Supabase storage is built on S3, but does not expose the archival storage tiers.
However, they do seem to pass on some economy of scale savings making it
slightly less expensive than using the default tier on S3. That said, it is
still more expensive than R2, and bandwidth is not free. The deep integration
with Supabase auth is compelling, but not worth the lock-in or added cost over
using R2.