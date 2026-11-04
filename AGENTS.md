# Project rules

- Admin client builds live in the `projects` table (optionally linked to an enquiry via `enquiry_id`), with photos in the private `project-photos` bucket and admin-only access — keeps build tracking separate from the enquiry inbox.
- Use the shared scroll-reveal hook for section entrances; observe each reveal target independently and honor reduced motion so off-screen content does not animate prematurely.
