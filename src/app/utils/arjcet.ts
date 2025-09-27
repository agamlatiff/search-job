import arjcet, { fixedWindow, shield, tokenBucket } from "@arcjet/next";

export { arjcet, fixedWindow, tokenBucket, shield };

export default arjcet({
  key: process.env.arjcet_KEY!,
  rules: [],
});
