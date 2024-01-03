---
title: "Design Document for Project Events Table"
date: 2023-12-29
status: "Implemented"
authors:
  - "Kevin Neaton <kevin@abstractgoods.cc>"
version: "v1.1"
summary: "This document outlines the design for a new table, project_events, which will store JSON data structures representing events or changes associated with a project and user. Each event is associated with an attestation."
---

## Summary

This design document details the creation of a new table, `project_events`, in the `mesa` schema. The `project_events` table is designed to store JSON data structures that represent events or changes associated with a project and user. Each data structure describes an event or change to the project and is submitted by a user who is a member of the project. The table is designed to be append-only, meaning that once an event is recorded, it cannot be modified or deleted.

## Rationale

The `project_events` table is necessary to track events or changes made to a project by its members, ensuring accountability and providing a history of modifications for auditing purposes. The immutability of the event log is crucial for maintaining a reliable audit trail. Additionally, the inclusion of attestations in the event data provides a mechanism for verifying the authenticity and integrity of the events.

## Requirements

1. Create a `project_events` table in the `mesa` schema with the following columns:
   - `id`: unique identifier for the event.
   - `project_id`: reference to the `projects` table.
   - `user_id`: reference to the `auth.users` table, representing the user who made the event.
   - `data`: a JSONB column to store the data structure describing the event.
   - `attestation`: a JSONB column to store the attestation associated with the event.
   - `attestation_uid`: a generated column to store the UID of the attestation, extracted from the `attestation` JSON data.
   - `created_at`: timestamp of when the event was recorded.
   - `created_by`: reference to the `auth.users` table, representing the user who recorded the event.

2. When a project is deleted, all associated events should be removed by using `ON DELETE CASCADE` with the reference from the `project_events` table.

3. Enable Row Level Security (RLS) on the `project_events` table.

4. Define the following RLS policies:
   - Allow authenticated users to insert their own events. This is enforced by checking that the `user_id` field matches the user's ID and the user has the 'owner' role for the project.
   - Allow authenticated users to select their own events. This is enforced by checking that the `user_id` field matches the user's ID and the user has the 'owner' role for the project.

5. Add a new trigger and function to prevent updates to the `project_events` table, ensuring that the event data cannot be accidentally changed. This function should be defined in the `private` schema using `SECURITY DEFINER` to bypass RLS for performance and security reasons. The search path of the function should be set to `private, pg_temp` to prevent unauthorized access to other schemas. The trigger for this function should be named `10_prevent_updates` to ensure it runs before other triggers.

6. Add a new trigger using the existing `private.mesa_handle_row_meta` function to manage the `created_at` and `created_by` metadata columns. The trigger should be named `20_handle_row_meta` to ensure it runs after the `10_prevent_updates` trigger.

7. Add a unique constraint on the `attestation_uid` column to ensure that each attestation is only recorded once.

8. Grant only INSERT and SELECT privileges on the `project_events` table to the `authenticated` role.

## Conclusion

The `project_events` table is designed to provide a reliable and secure way to track events or changes made to a project by its members. By ensuring the immutability of the event log, implementing the necessary RLS policies, and including attestations in the event data, we can maintain a reliable audit trail, ensure that only authorized users can access and manipulate the data, and verify the authenticity and integrity of the events. Future versions of the schema may include additional features based on user feedback and needs.
Note: The numeric prefixes in the trigger names are used to control the order of trigger execution. In PostgreSQL, triggers with the same timing and event are fired in alphabetical order by name, so numeric prefixes can be used to ensure a specific order([1](https://www.postgresql.org/docs/current/trigger-definition.html)).