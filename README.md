# Icelandic Vocabulary Site

A clean Next.js site for Vercel with:

- 3 advanced Icelandic words each week
- flip cards for word / meaning
- example sentences below each word
- a separate learned-words tab saved in localStorage

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Deploy.

## Update each week

Edit `lib/words.ts` and replace the `currentWeekWords` array with the next 3 words.

## Notes

- Learned words are stored on the device in the browser.
- If you want cross-device sync later, the next step would be a small database like Supabase or Firebase.
